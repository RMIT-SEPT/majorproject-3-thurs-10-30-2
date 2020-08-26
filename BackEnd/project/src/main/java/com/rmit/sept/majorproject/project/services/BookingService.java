package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.BookingRepository;
import com.rmit.sept.majorproject.project.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
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
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId){
        bookingRepository.deleteById(bookingId);
    }

    public Booking updateBooking(Long id, Booking booking){
        Booking selectedBooking = findBookingById(booking.getId());

        return bookingRepository.save(booking);
    }
}
