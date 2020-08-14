package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
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
        user.setName("Test User");
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
}
