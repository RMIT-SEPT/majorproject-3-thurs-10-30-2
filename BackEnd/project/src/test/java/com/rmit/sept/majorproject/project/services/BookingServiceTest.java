package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.model.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.text.ParseException;
import java.text.SimpleDateFormat;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookingServiceTest {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserService userService;

    private Booking booking;
    private User customer;
    private User worker;

    @BeforeAll
    public void setup() {
        booking = new Booking();

        createDummyUsers();

        booking.setCustomer(customer);
        booking.setWorkerId(worker);
    }

    private void createDummyUsers() {
        customer = new User();
        worker = new User();

        customer.setUsername("Bob");
        customer.setEmail("bob@bob.com");
        customer.setPassword("fwedsf34gf34fge");
        userService.saveOrUpdateUser(customer);

        worker.setUsername("Alice");
        worker.setEmail("alice@alice.com");
        worker.setPassword("fwedsf34gf34fge");
        userService.saveOrUpdateUser(worker);
    }

    @BeforeEach
    public void beforeTestSetup() throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd:HH-mm");
        booking.setStartTime(format.parse("2020-12-12:13-30"));
        booking.setEndTime(format.parse("2020-12-12:14-30"));
        booking.setDuration(1);
    }

    @Test
    void cancelBooking_ThrowsException_IfBookingDoesNotExist(){
        bookingService.createBooking(booking);
        bookingService.cancelBooking(booking.getId());
        Assertions.assertThrows(NullPointerException.class, () -> bookingService.cancelBooking(booking.getId()),
                "Throws exception because booking does not exist");
    }

    @Test
    void setTime_ReturnNull_IfStartTimeIsInvalid() throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd:HH-mm");
        booking.setStartTime(format.parse("2019-12-12:12-30")); //setting invalid startTime;
        Assertions.assertNull(bookingService.createBooking(booking),
                "Should return null if start time is invalid");
    }

    @Test
    void setTime_ReturnNull_IfEndTimeIsInvalid() throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd:HH-mm");
        booking.setEndTime(format.parse("2020-12-12:08-30")); //setting invalid endTime;
        Assertions.assertNull(bookingService.createBooking(booking),
                "Should return null if end time is invalid");
    }

    @Test
    void createBooking_ReturnBooking_IfSetTimeIsCorrect(){
        Booking test = bookingService.createBooking(booking);
        Assertions.assertNotNull(test,"Booking has been added successfully");
    }

    @Test
    void updateDuration_changesDuration_IfBookingExist(){
        booking.setDuration(2);
        Booking test = bookingService.updateBooking(booking);
        Assertions.assertEquals(booking.getDuration(), test.getDuration());
    }

}
