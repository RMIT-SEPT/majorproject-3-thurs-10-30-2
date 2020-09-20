package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;




@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserServiceTest {

    @Autowired
    private UserService userService;
    private User user;

    @BeforeAll
    public void setup() {
        user = new User();
        user.setName("test user");
        user.setEmail("test@email.com");
        user.setPassword("$tr0NgPa$SWoRD");
    }

    @BeforeEach
    void beforeTestSetup(){
        user.setName("test user");
        user.setEmail("test@email.com");
        user.setPassword("$tr0NgPa$SWoRD");
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
    void saveUser_returnsNull_IfUserNameIsInvalidLength(){
        user.setName("no"); //invalid User name length
        User newUser = userService.saveOrUpdateUser(user);
        //fails as User cannot be created with name less than length 3
        Assertions.assertNull(newUser);
    }
    @Test
    void updateUser_returnsUpdatedUser_UserExists() {
        userService.saveOrUpdateUser(user);
        user.setName("updated");
        Assertions.assertNotNull(userService.saveOrUpdateUser(user));
    }

    @Test
    void saveorupdateusers_returnsNull_UserHasInvalidEmail(){
        user.setEmail("email.com");
        // Fails as user must have an @ symbol in their email address
        Assertions.assertNull(userService.saveOrUpdateUser(user));
    }

    @Test
    void saveorupdateusers_returnsNull_UserPasswordIsInvalidLength(){
        user.setPassword("12345");
        // Fails as user have a password 6 or more characters.
        Assertions.assertNull(userService.saveOrUpdateUser(user));
    }
}
