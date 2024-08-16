package com.office.oficeSpace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Setter
@Getter
    @Entity
    public class Event {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String title;
        private String start;
        private String end;
        private boolean allDay;
        private String officeName;
        private String backgroundColor;

        // Getters and Setters
    }
