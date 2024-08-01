package com.office.oficeSpace.services;


import com.office.oficeSpace.entity.Booking;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    void saveBooking(Booking booking);
    void updateBooking(Long id, Booking booking);
    Booking getBookingById(Long id);
    void deleteBooking(Long id);
}
