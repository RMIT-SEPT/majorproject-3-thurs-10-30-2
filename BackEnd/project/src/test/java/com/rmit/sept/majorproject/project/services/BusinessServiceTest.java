package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import com.rmit.sept.majorproject.project.model.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.TransactionSystemException;

import java.time.DayOfWeek;
import java.time.LocalTime;

import static com.rmit.sept.majorproject.project.sharedtestdata.TestingConstants.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BusinessServiceTest {
    @Autowired
    private UserService userService;
    private User user;

    @Autowired
    private BusinessService businessService;
    private Business business;
    private BusinessHours busiessHours;

    @BeforeAll
    public void setup() {
        // Create an admin to "own" the business
        user = new User();
        user.setFullName(GOOD_FULL_NAME);
        user.setUsername(GOOD_USERNAME);
        user.setPassword(GOOD_PASSWORD);
        user.setAccountType(User.AccountType.ADMIN);
        user = userService.create(user);

        busiessHours = new BusinessHours();
    }

    @BeforeEach
    void beforeTestSetup() {
        // Delete business if it has been saved by a test
        try {
            businessService.delete(business.getId());
        } catch (Exception e) {
            // Do nothing, we just want to delete this business in the event it had been previously saved.
        }

        business = new Business();
        business.setName("MicroTest");
        business.setAdmin(user);
    }

    @Test
    void addBusiness_ReturnsNull_IfNameIsBlank() {
        business.setName("");
        Assertions.assertNull(businessService.saveOrUpdateBusiness(business),
                "Returns Null because name is blank");
    }

    @Test
    void addBusiness_ReturnsBusiness_IfNameIsCorrect(){
        Business test = businessService.saveOrUpdateBusiness((business));
        Assertions.assertNotNull(test,"Business Should be added successfully");
    }

    @Test
    void addBusiness_ReturnsNull_IfNameAlreadyExists(){
        business.setName("Duplicate");
        Business original = businessService.saveOrUpdateBusiness(business);
        Business test = businessService.saveOrUpdateBusiness(business);

        Assertions.assertEquals(test.getId(), original.getId(),
                "Id should not change, because new object shouldn't be created.");
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
//
//    @Test
//    void addBusinessHours_ReturnsNull_IfDuplicateDayOfWeek() {
//        busiessHours.setDayOfWeek(DayOfWeek.FRIDAY);
//        LocalTime start = LocalTime.parse("09:00");
//        LocalTime end = LocalTime.parse("17:00");
//        busiessHours.setStartTime(start);
//        busiessHours.setEndTime(end);
//        business.setBusinessHours(busiessHours);
//        businessService.saveOrUpdateBusiness(business);
//        Business test = businessService.saveOrUpdateBusiness(business);
//        Assertions.assertNull(test);
//    }

    @Test
    void updateBusinessName_changesBusinessName_ifBusinessExists() {
        business.setName("Updated name");
        Business updatedBusiness = businessService.saveOrUpdateBusiness(business);
        Assertions.assertEquals(business.getName(), updatedBusiness.getName());
    }

}
