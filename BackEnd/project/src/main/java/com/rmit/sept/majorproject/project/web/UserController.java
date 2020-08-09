package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.User;
import com.rmit.sept.majorproject.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/User")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){
    if(result.hasErrors()){
        return new ResponseEntity<String>("Invalid User Object", HttpStatus.BAD_REQUEST);
    }
        User user1 = userService.saveOrUpdateUser(user); //tmp user
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }
}
