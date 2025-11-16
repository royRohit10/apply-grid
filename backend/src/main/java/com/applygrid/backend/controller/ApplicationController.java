package com.applygrid.backend.controller;

import com.applygrid.backend.model.Job;
import com.applygrid.backend.model.JobApplication;
import com.applygrid.backend.repository.JobApplicationRepository;
import com.applygrid.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seeker")
public class ApplicationController {

    @Autowired
    private JobApplicationRepository repo;

    @Autowired
    private JobRepository jr;

    @PostMapping("/apply/{jobId}")
    public JobApplication applyJob(@PathVariable String jobId,
                                   @AuthenticationPrincipal UserDetails user,
                                   @RequestBody JobApplication app) {
        Job job = jr.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + jobId));
        app.setTitle(job.getTitle());
        app.setCompany(job.getCompany());
        app.setJobId(jobId);
        app.setSeekerEmail(user.getUsername());
        return repo.save(app);
    }

    @GetMapping("/applications")
    public List<JobApplication> getMyApplications(@AuthenticationPrincipal UserDetails user) {
        return repo.findBySeekerEmail(user.getUsername());
    }

    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jr.findAll();
    }
}
