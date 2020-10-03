package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.model.User;
import com.rmit.sept.majorproject.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
            return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
