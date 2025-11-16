package com.applygrid.backend.service;

import com.applygrid.backend.model.ApplicationStatus;
import com.applygrid.backend.model.Job;
import com.applygrid.backend.model.JobApplication;
import com.applygrid.backend.repository.JobApplicationRepository;
import com.applygrid.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getJobsByEmployer(String employerId) {
        return jobRepository.findByEmployerId(employerId);
    }

    public Optional<Job> getJobById(String id) {
        return jobRepository.findById(id);
    }

    public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }

    public Job applyToJob(String jobId, String userId) {
        // Ensure the identifier used is consistent with JobApplication.seekerEmail semantics.
        // If userId is not an email, consider renaming seekerEmail to seekerId everywhere.
        String seeker = userId;

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // check if an application already exists for this user+job
        Optional<JobApplication> existingOpt = jobApplicationRepository.findByJobIdAndSeekerEmail(jobId, seeker);

        if (existingOpt.isPresent()) {
            // already applied — choose behavior:
            // Option 1 (idempotent): return job without creating duplicate
            // return job;

            // Option 2 (explicit): throw an exception so controller can return 400/409
            throw new RuntimeException("You have already applied to this job.");
        }

        // create and save JobApplication document
        JobApplication application = new JobApplication();
        application.setJobId(jobId);
        application.setSeekerEmail(seeker);
        application.setAppliedAt(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PENDING);
        jobApplicationRepository.save(application);

        // add to job applicants list (quick reference)
        if (job.getApplicants() == null) {
            job.setApplicants(new ArrayList<>());
        }
        if (!job.getApplicants().contains(seeker)) {
            job.getApplicants().add(seeker);
        }

        return jobRepository.save(job);
    }
}
