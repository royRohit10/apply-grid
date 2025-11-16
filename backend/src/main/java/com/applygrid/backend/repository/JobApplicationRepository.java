package com.applygrid.backend.repository;

import com.applygrid.backend.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {
    List<JobApplication> findBySeekerEmail(String email);
    List<JobApplication> findByJobId(String jobId);
    List<JobApplication> findByJobIdIn(List<String> jobIds);
    Optional<JobApplication> findByJobIdAndSeekerEmail(String jobId, String seekerEmail);
}

