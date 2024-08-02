package com.office.oficeSpace.controller;
import org.springframework.security.core.userdetails.User;

import com.office.oficeSpace.entity.Booking;
import com.office.oficeSpace.services.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "localhost:4200/**", allowedHeaders = "*")
public class BookingController {

    @Autowired
    private BookingServiceImpl bookingService;

    @GetMapping
    public List<Booking> findAll() {
        return bookingService.getAllBookings();
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking, Authentication authentication) {
        User loggedInUser = (User) authentication.getPrincipal(); // Get the logged-in user
       // booking.setUser(loggedInUser); // Set the user in the booking
        bookingService.saveBooking(booking);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> findOne(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> update(@PathVariable Long id, @RequestBody Booking booking) {
        bookingService.updateBooking(id, booking);
        return ResponseEntity.ok(booking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}

