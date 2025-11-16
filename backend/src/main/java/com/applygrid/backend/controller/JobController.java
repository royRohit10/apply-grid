package com.applygrid.backend.controller;

import com.applygrid.backend.model.Job;
import com.applygrid.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @PostMapping("/create")
    public Job createJob(@RequestBody Job job, @AuthenticationPrincipal UserDetails user) {
        job.setEmployerId(user.getUsername());
        job.setEmployerEmail(user.getUsername());// email as employer identifier
        return jobService.createJob(job);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable String id) {
        jobService.deleteJob(id);
        return "Job deleted successfully";
    }

    @PostMapping("/{id}/apply")
    public Job applyForJob(@PathVariable String id, @AuthenticationPrincipal UserDetails user) {
        return jobService.applyToJob(id, user.getUsername());
    }
}
