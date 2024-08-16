package com.office.oficeSpace.repository;

import com.office.oficeSpace.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<Event, Long> {
}
