package com.office.oficeSpace.services;


import com.office.oficeSpace.entity.Event;
import com.office.oficeSpace.repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepo eventRepository;

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        event.setTitle(eventDetails.getTitle());
        event.setStart(eventDetails.getStart());
        event.setEnd(eventDetails.getEnd());
        event.setAllDay(eventDetails.isAllDay());
        event.setOfficeName(eventDetails.getOfficeName());
        event.setBackgroundColor(eventDetails.getBackgroundColor());

        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        eventRepository.delete(event);
    }
}
