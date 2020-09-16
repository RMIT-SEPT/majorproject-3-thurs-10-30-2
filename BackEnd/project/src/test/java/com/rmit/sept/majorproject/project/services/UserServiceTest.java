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

    @Autowired
    private UserService userService;
    private User user;

    @BeforeEach
    void beforeTestSetup(){
        // Create a user with valid data
        user = new User();
        user.setName("test user");
        user.setEmail("test@email.com");
    }

    @Test
    void delete_DoesNotThrow_IfUserExists() {
        User newUser = userService.saveOrUpdateUser(user);
        userService.delete(newUser.getId());
    }

    @Test
    void delete_ThrowsException_IfUserDoesNotExist(){
        User newUser = userService.saveOrUpdateUser(user);
        userService.delete(newUser.getId());    // This delete should succeed

        Assertions.assertThrows(EmptyResultDataAccessException.class, () -> userService.delete(newUser.getId()),
                "Deleting a user which doesn't exist should throw org.springframework.dao.EmptyResultDataAccessException.");
    }

    @Test
    void saveUser_ThrowsException_IfNameIsTooShort() {
        user.setName("12");     // Current constraint min is 3

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "Username with length 2 is too short, javax.validation.ConstraintViolationException should be thrown.");
    }

    @Test
    void saveUser_ThrowsException_IfNameIsTooLong() {
        user.setName("1234567890123456");   // Current constraint max is 15

        Assertions.assertThrows(ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user),
                "Username with length 16 is too long, javax.validation.ConstraintViolationException should be thrown.");
    }

    @Test
    void updateUser_returnsUpdatedUser_UserExists() {
        userService.saveOrUpdateUser(user);
        user.setName("updated");
        Assertions.assertNotNull(userService.saveOrUpdateUser(user));
    }

    @Test
    void updateUser_returnsNull_UserDoesNotExists() {
        user.setName("updated");
        Assertions.assertNull( userService.saveOrUpdateUser(user));
    }

    @Test
    void saveorupdateusers_returnsNull_UserHasInvalidEmail(){
        user.setEmail("email.com");
        // Fails as user must have an @ symbol in their email address
        Assertions.assertThrows(javax.validation.ConstraintViolationException.class, () -> userService.saveOrUpdateUser(user)
        );
    }

    @Test
    void saveorupdateusers_returnsNull_UserPasswordIsInvalidLength(){
        user.setPassword("12345");
        // Fails as user have a password 6 or more characters.
        Assertions.assertNull(userService.saveOrUpdateUser(user));
    }
}
