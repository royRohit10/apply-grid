package com.applygrid.backend.repository;

import com.applygrid.backend.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findByEmployerId(String employerId);
    List<Job> findByEmployerEmail(String employerEmail);
}
