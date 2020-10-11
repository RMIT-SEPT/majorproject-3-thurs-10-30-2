package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/*
POST REQUEST FORMAT
*only works if there are existing users (at least 2)
{
    "duration": 2,
    "customer": {
        "id": 1,
        "name": "customer",
        "email": "customer@hotmail.com",
        "password": "231asdsd12x",
        "accountType": "CUSTOMER"
    },
    "worker": {
        "id": 2,
        "name": "worker",
        "email": "workerer@hotmail.com",
        "password": "231asds2x",
        "accountType": "WORKER"
    },
    "startTime": "2020-12-08-04:20",
    "endTime": "2020-12-08-04:50"
}
 */
@CrossOrigin
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id){
        if(bookingService.findBookingById(id) != null){
            return new ResponseEntity<>(bookingService.findBookingById(id), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("ID Does Not Exist",HttpStatus.NOT_FOUND);
        }
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
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking){
        return new ResponseEntity<>(bookingService.createBooking(booking), HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
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
