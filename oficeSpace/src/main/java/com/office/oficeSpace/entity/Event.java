package com.office.oficeSpace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Setter
@Getter
@Document(collection = "events") // Replaces @Entity
public class Event {

    @Id // MongoDB-specific ID annotation
    private String id; // Use String type for MongoDB IDs
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean allDay;
    private String officeName;
    private String backgroundColor;

    // Getters and Setters are provided by Lombok (@Getter, @Setter)
}
