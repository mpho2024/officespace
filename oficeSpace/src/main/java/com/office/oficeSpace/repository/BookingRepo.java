package com.office.oficeSpace.repository;

import com.office.oficeSpace.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<Booking, Long> {
}
