package com.applygrid.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "jobs")
public class Job {
    @Id
    private String id;
    private String title;
    private String description;
    private String company;
    private String location;
    private double salary;
    private String employerId;
    private String employerEmail;
    private List<String> applicants = new ArrayList<>();
    private LocalDateTime createdAt = LocalDateTime.now();
}
