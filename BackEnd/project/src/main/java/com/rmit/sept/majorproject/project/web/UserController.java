package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.*;
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
@RequestMapping("/api/User")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @PostMapping("/worker")
    public ResponseEntity<?> createNewUser(@RequestBody WorkerHolder holder, BindingResult result){
        for (WorkerHours hours: holder.getWorkerHours()) {
            holder.getUser().setWorkerHours(hours);
        }
        User user1 = userService.saveOrUpdateUser(holder.getUser()); //tmp user

        return new ResponseEntity<>(user1, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // TODO: Implement security checks before proceeding with deletion.
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
