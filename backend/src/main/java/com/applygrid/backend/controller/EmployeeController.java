package com.applygrid.backend.controller;

import com.applygrid.backend.exception.ResourceNotFoundException;
import com.applygrid.backend.exception.UnauthorizedException;
import com.applygrid.backend.model.ApplicationStatus;
import com.applygrid.backend.model.Job;
import com.applygrid.backend.model.JobApplication;
import com.applygrid.backend.repository.JobApplicationRepository;
import com.applygrid.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employer")
class EmployerController {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private JobApplicationRepository appRepo;

    @GetMapping("/allApplicants")
    public List<JobApplication> getApplicantsForMyJobs(@AuthenticationPrincipal UserDetails user) {
        // Fetch all jobs created by the logged-in employer
        List<Job> myJobs = jobRepo.findByEmployerEmail(user.getUsername());

        // Extract all job IDs
        List<String> jobIds = myJobs.stream()
                .map(Job::getId)
                .collect(Collectors.toList());

        // Fetch all job applications for those job IDs
        return appRepo.findByJobIdIn(jobIds);
    }
    @GetMapping("/applicants/{jobId}")
    public List<JobApplication> getApplicantsForJob(
            @PathVariable String jobId,
            @AuthenticationPrincipal UserDetails user) {

        // Check if the logged-in employer owns this job
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerEmail().equals(user.getUsername())) {
            throw new RuntimeException("Unauthorized: You don't own this job");
        }

        // Return only applications of this specific job
        return appRepo.findByJobId(jobId);
    }
    @PostMapping("/applications/{applicationId}/accept")
    public JobApplication acceptApplication(
            @PathVariable String applicationId,
            @AuthenticationPrincipal UserDetails user) {

        JobApplication application = appRepo.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        Job job = jobRepo.findById(application.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getEmployerEmail().equals(user.getUsername())) {
            throw new UnauthorizedException("You do not own this job");
        }

        application.setStatus(ApplicationStatus.ACCEPTED);
        return appRepo.save(application);
    }

    @PostMapping("/applications/{applicationId}/reject")
    public JobApplication rejectApplication(
            @PathVariable String applicationId,
            @AuthenticationPrincipal UserDetails user) {

        JobApplication application = appRepo.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        Job job = jobRepo.findById(application.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getEmployerEmail().equals(user.getUsername())) {
            throw new UnauthorizedException("You do not own this job");
        }

        application.setStatus(ApplicationStatus.REJECTED);
        return appRepo.save(application);
    }


}
