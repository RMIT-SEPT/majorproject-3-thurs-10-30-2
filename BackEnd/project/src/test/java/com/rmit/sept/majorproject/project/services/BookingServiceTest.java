package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.Booking;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;


import java.text.ParseException;
import java.text.SimpleDateFormat;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookingServiceTest {

    @Autowired
    private BookingService bookingService;
    private Booking booking;


    @BeforeAll
    public void setup() {
        booking = new Booking();
    }
    @BeforeEach
    public void beforeTestSetup() throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd:HH-mm");
        booking.setStartTime(format.parse("2020-12-12:13-30"));
        booking.setEndTime(format.parse("2020-12-12:14-30"));
    }
    @Test
    void cancel_ThrowsException_IfBookingDoesNotExist(){
        bookingService.createBooking(booking);
        bookingService.cancelBooking(booking.getId());
        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> bookingService.cancelBooking(booking.getId()),
                "Throws exception because booking does not exist");
    }
    @Test
    void setTime_ThrowsException_startTimeSetIsInvalid() throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd:HH-mm");
        booking.setStartTime(format.parse("2019-12-12:13-30")); //invalid startTime;
        Assertions.assertNull(bookingService.createBooking(booking));
    }
}
