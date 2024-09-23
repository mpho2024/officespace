package com.office.oficeSpace.repository;

import com.office.oficeSpace.entity.Event;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventRepo extends MongoRepository<Event, Long> {
}
