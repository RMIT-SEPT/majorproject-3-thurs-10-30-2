package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.validation.ConstraintViolationException;

import static com.rmit.sept.majorproject.project.sharedtestdata.TestingConstants.*;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserServiceTest {



    @Autowired
    private UserService userService;
    private User user;

    @BeforeEach
    void beforeTestSetup(){
        // Delete user if it has been saved by a test
        try {
            userService.delete(user.getId());
        } catch (Exception e) {
            // Do nothing, we just want to delete this user in the event it had been previously saved.
        }

        // Create a user with valid data
        user = new User();
        user.setFullName(GOOD_FULL_NAME);
        user.setUsername(GOOD_USERNAME);
        user.setPassword(GOOD_PASSWORD);
    }

    @Test
    void delete_DoesNotThrow_IfUserExists() {
        User newUser = userService.saveOrUpdateUser(user);
        Assertions.assertDoesNotThrow(() -> userService.delete(newUser.getId()),
                "Deleting an existing user should succeed.");
    }

    @Test
    void delete_ThrowsException_IfUserDoesNotExist(){
        User newUser = userService.saveOrUpdateUser(user);
        userService.delete(newUser.getId());    // This delete should succeed

        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> userService.delete(newUser.getId()),
                "Deleting a user which doesn't exist should throw org.springframework.dao.EmptyResultDataAccessException.");
    }

    @Test
    void saveOrUpdateUser_Succeeds_IfAllDataIsValid() {
        User newUser = userService.saveOrUpdateUser(user);
        Assertions.assertTrue(newUser.getUsername().equals(GOOD_USERNAME) &&
                newUser.getFullName().equals(GOOD_FULL_NAME),
                "Returned user data should match what was saved.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfNameIsTooShort() {
        user.setUsername("12");     // Current constraint min is 3

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "User name with length 2 is too short, javax.validation.ConstraintViolationException should be thrown.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfNameIsTooLong() {
        user.setUsername("1234567890123456");   // Current constraint max is 15

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "User name with length 16 is too long, javax.validation.ConstraintViolationException should be thrown.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfNameIsBlank() {
        user.setUsername("");

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "Blank name for user should throw javax.validation.ConstraintViolationException.");
    }

    @Test
    void saveOrUpdateUser_returnsUpdatedUser_IfUserExists() {
        String newName = "New Fullname";

        // Save current
        userService.saveOrUpdateUser(user);

        // Change name and update
        user.setFullName(newName);
        userService.saveOrUpdateUser(user);

        Assertions.assertEquals(user.getFullName(), newName);
    }

}
