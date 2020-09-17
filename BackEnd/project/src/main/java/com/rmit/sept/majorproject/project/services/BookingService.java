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
            return null;
        }
        return booking.get();
    }
    public Booking createBooking(Booking booking){
        if(booking.getStartTime().before(currentDateTime())){
            return null;
        }
        if(booking.getEndTime().before(booking.getStartTime())){
            return null;
        }
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId){
        Booking booking = findBookingById(bookingId);
        bookingRepository.deleteById(booking.getId());
    }

    public Booking updateBooking(Booking booking){

        return bookingRepository.save(booking);
    }
    public Date currentDateTime(){
        Date now = new Date();
        return now;
    }
}
