package com.office.oficeSpace.controller;
import com.office.oficeSpace.repository.EventRepo;
import org.springframework.security.core.userdetails.User;

import com.office.oficeSpace.entity.Event;
import com.office.oficeSpace.services.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "**", allowedHeaders = "*")


    @RestController
    @RequestMapping("/api/events")
    public class EventController {

        @Autowired
        private EventRepo eventRepository;

        @GetMapping("/")
        public List<Event> getAllEvents() {
            return eventRepository.findAll();
        }

        @GetMapping("/{id}")
        public Optional<Event> getEventById(@PathVariable Long id) {
            return eventRepository.findById(id);
        }

        @PostMapping
        public Event createEvent(@RequestBody Event event) {
            return eventRepository.save(event);
        }

        @PutMapping("/{id}")
        public Event updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            event.setTitle(eventDetails.getTitle());
            event.setStartDate(eventDetails.getStartDate());
            event.setEndDate(eventDetails.getEndDate());
            event.setAllDay(eventDetails.isAllDay());
            event.setOfficeName(eventDetails.getOfficeName());
            event.setBackgroundColor(eventDetails.getBackgroundColor());

            return eventRepository.save(event);
        }

        @DeleteMapping("/{id}")
        public void deleteEvent(@PathVariable Long id) {
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            eventRepository.delete(event);
        }
    }