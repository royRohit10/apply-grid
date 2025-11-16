package com.applygrid.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "applications")
public class JobApplication {
    @Id
    private String id;
    private String jobId;
    private String title;
    private String company;
    private String seekerEmail; // or seekerId
    private String resumeLink;
    private ApplicationStatus status = ApplicationStatus.PENDING;
    private LocalDateTime appliedAt = LocalDateTime.now();
}
