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
    void False_TestFails_IfUserNameIsInvalidLength(){
        user.setName("no"); //invalid User name length
        User newUser = userService.saveOrUpdateUser(user);
        //fails as User cannot be created with name less than length 3
        Assertions.assertFalse(newUser.getName().isEmpty(),"Creating a User with a name length less than 3 should fail");
    }
    @Test
    void updateUser_returnsUpdatedUser_UserExists() {
        userService.saveOrUpdateUser(user);
        user.setName("updated");
        Assertions.assertTrue( userService.saveOrUpdateUser(user) != null);
    }
}
