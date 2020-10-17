package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.model.User;
import com.rmit.sept.majorproject.project.services.BookingService;
import com.rmit.sept.majorproject.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

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
        ResponseEntity<?> result;

        // Need to retrieve more details about the users, as only the id is passed in
        Optional<User> customer = userService.get(booking.getCustomer().getId());
        Optional<User> worker = userService.get(booking.getWorker().getId());

        if (customer.isPresent() && worker.isPresent()) {
            booking.setCustomer(customer.get());
            booking.setWorker(worker.get());

            result = new ResponseEntity<>(bookingService.createBooking(booking), HttpStatus.CREATED);
        } else {
            result = new ResponseEntity<>("One or more users not found.", HttpStatus.NOT_FOUND);
        }

        return result;
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
