package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id){
        Booking booking = bookingService.findBookingById(id);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<?> all(){
        List<Booking> allBookings = bookingService.all();
        if(allBookings.isEmpty()){
            return new ResponseEntity<>("No Bookings found.", HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(allBookings, HttpStatus.ACCEPTED);
        }
    }
    @PostMapping("")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody Booking booking){
        Booking createdBooking = bookingService.createBooking(booking);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id){
        bookingService.cancelBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("")
    public ResponseEntity<Booking> updateBooking(@RequestBody @Valid Booking booking){
        Booking updatedBooking = bookingService.updateBooking(booking);
        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
    }



}
