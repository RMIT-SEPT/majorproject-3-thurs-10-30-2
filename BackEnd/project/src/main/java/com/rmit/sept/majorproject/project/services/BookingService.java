package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.BookingRepository;
import com.rmit.sept.majorproject.project.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking findBookingById(Long id){
        Optional<Booking> booking = bookingRepository.findById(id);
        if(!booking.isPresent()){
            //throw exception booking not found..
        }
        return booking.get();
    }
    public Booking createBooking(Booking booking){
        //TODO create booking logic
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId){
        bookingRepository.deleteById(bookingId);
    }

    public Booking updateBooking(Long bookingId, Booking booking){
        //TODO update logic
        return bookingRepository.save(booking);
    }
}
