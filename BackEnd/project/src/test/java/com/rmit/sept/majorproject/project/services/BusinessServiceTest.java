package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.TransactionSystemException;

import java.time.DayOfWeek;
import java.time.LocalTime;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BusinessServiceTest {

    @Autowired
    private BusinessService businessService;
    private Business business;
    private BusinessHours busiessHours;

    @BeforeAll
    public void setup() {
        business = new Business();
        busiessHours = new BusinessHours();
    }

    @BeforeEach
    void beforeTestSetup(){
        business.setName("MicroTest");
    }

    @Test
    void addBusiness_ReturnsException_IfNameIsBlank() {
        business.setName("");
        Assertions.assertThrows(TransactionSystemException.class, () -> businessService.saveOrUpdateBusiness(business),
                "Throws exception because name is blank");
    }

    @Test
    void addBusiness_ReturnsBusiness_IfNameIsCorrect(){
        Business test = businessService.saveOrUpdateBusiness((business));
        Assertions.assertNotNull(test,"Business Should be added successfully");
    }

    @Test
    void addBusiness_ReturnsNull_IfNameAlreadyExists(){
        business.setName("Duplicate");
        businessService.saveOrUpdateBusiness(business);
        Business test = businessService.saveOrUpdateBusiness(business);
        Assertions.assertNull(test,"Null as Business with that name already exists");
    }

    @Test
    void addBusinessHours_ReturnsBusiness_IfValidHours() {
        busiessHours.setDayOfWeek(DayOfWeek.MONDAY);
        LocalTime start = LocalTime.parse("09:00");
        LocalTime end = LocalTime.parse("17:00");
        busiessHours.setStartTime(start);
        busiessHours.setEndTime(end);
        business.setBusinessHours(busiessHours);
        Business test = businessService.saveOrUpdateBusiness(business);
        Assertions.assertNotNull(test);
    }

    @Test
    void addBusinessHours_ReturnsNull_IfInvalidHours() {
        busiessHours.setDayOfWeek(DayOfWeek.TUESDAY);
        LocalTime start = LocalTime.parse("17:00");
        LocalTime end = LocalTime.parse("05:00");
        busiessHours.setStartTime(start);
        busiessHours.setEndTime(end);
        business.setBusinessHours(busiessHours);
        Business test = businessService.saveOrUpdateBusiness(business);
        Assertions.assertNull(test);
    }

    @Test
    void addBusinessHours_ReturnsNull_IfDuplicateDayOfWeek() {
        busiessHours.setDayOfWeek(DayOfWeek.FRIDAY);
        LocalTime start = LocalTime.parse("09:00");
        LocalTime end = LocalTime.parse("17:00");
        busiessHours.setStartTime(start);
        busiessHours.setEndTime(end);
        business.setBusinessHours(busiessHours);
        businessService.saveOrUpdateBusiness(business);
        Business test = businessService.saveOrUpdateBusiness(business);
        Assertions.assertNull(test);
    }

}
