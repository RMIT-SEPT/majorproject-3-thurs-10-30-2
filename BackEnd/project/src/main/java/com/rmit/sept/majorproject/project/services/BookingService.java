package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.BookingRepository;
import com.rmit.sept.majorproject.project.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking findBookingById(Long id){
        Optional<Booking> booking = bookingRepository.findById(id);
        if(!booking.isPresent()){
            throw new IllegalArgumentException("Booking could not be found");
        }
        return booking.get();
    }
    public Booking createBooking(Booking booking){
        if(booking.getStartTime().before(currentDateTime())){
            throw new IllegalArgumentException("Invalid start time.");
        }
        if(booking.getEndTime().before(booking.getStartTime())){
            throw new IllegalArgumentException("Invalid end time.");
        }
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId){
        Booking booking = findBookingById(bookingId);
        bookingRepository.deleteById(booking.getId());
    }

    public Booking updateBooking(Booking booking){
        Booking selectedBooking = findBookingById(booking.getId());

        return bookingRepository.save(selectedBooking);
    }
    public Date currentDateTime(){
        Date now = new Date();
        return now;
    }
}
