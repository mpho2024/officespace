package com.office.oficeSpace.services;

import com.office.oficeSpace.entity.Booking;
import com.office.oficeSpace.repository.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepo bookingRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void saveBooking(Booking booking) {
        if (booking.getUser() == null) {
            throw new IllegalArgumentException("User must be set on the booking.");
        }
        bookingRepository.save(booking);
    }

    @Override
    public void updateBooking(Long id, Booking booking) {
        Booking bookingFromDb = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        bookingFromDb.setName(booking.getName());
        bookingFromDb.setEmail(booking.getEmail());
        bookingFromDb.setPhone(booking.getPhone());
        bookingFromDb.setOfficeName(booking.getOfficeName());
        bookingFromDb.setDateTime(booking.getDateTime());

        bookingRepository.save(bookingFromDb);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}