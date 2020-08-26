package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody Booking booking){
        Booking createdBooking = bookingService.createBooking(booking);
        return new ResponseEntity<Booking>(booking, HttpStatus.CREATED);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id){
        bookingService.cancelBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
