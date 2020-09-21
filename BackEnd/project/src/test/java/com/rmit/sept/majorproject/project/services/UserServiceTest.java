package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.validation.ConstraintViolationException;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserServiceTest {

    private final String GOOD_USER_NAME = "test user";
    private final String GOOD_USER_EMAIL = "test@email.com";
    private final String GOOD_PASSWORD = "$tr0NgPa$SWoRD";

    @Autowired
    private UserService userService;
    private User user;

    @BeforeEach
    void beforeTestSetup(){
        // Create a user with valid data
        user = new User();
        user.setName(GOOD_USER_NAME);
        user.setEmail(GOOD_USER_EMAIL);
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
        Assertions.assertTrue(newUser.getName().equals(GOOD_USER_NAME) &&
                        newUser.getEmail().equals(GOOD_USER_EMAIL),
                "Returned user data should match what was saved.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfNameIsTooShort() {
        user.setName("12");     // Current constraint min is 3

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "User name with length 2 is too short, javax.validation.ConstraintViolationException should be thrown.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfNameIsTooLong() {
        user.setName("1234567890123456");   // Current constraint max is 15

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "User name with length 16 is too long, javax.validation.ConstraintViolationException should be thrown.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfNameIsBlank() {
        user.setName("");

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "Blank name for user should throw javax.validation.ConstraintViolationException.");
    }

    @Test
    void updateUser_returnsUpdatedUser_UserExists() {
        userService.saveOrUpdateUser(user);
        user.setName("updated");
        Assertions.assertNotNull(userService.saveOrUpdateUser(user));
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfEmailIsInvalid(){
        user.setEmail("email.com");
        // Fails as user must have an @ symbol in their email address
        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "Invalid email should throw javax.validation.ConstraintViolationException.");
    }

    @Test
    void saveOrUpdateUser_ThrowsException_IfPasswordIsInvalidLength(){
        user.setPassword("12345");
        // Fails as user have a password 6 or more characters.
        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "Short password should throw javax.validation.ConstraintViolationException.");
    }
}
