package com.rmit.sept.majorproject.project.web;

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

@CrossOrigin
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        if(userService.findById(id) != null) {
            return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("ID Does Not Exist",HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("")
    public ResponseEntity<?> all() {
        List<User> allUsers = userService.getAll();
        if(allUsers.isEmpty()){
            return new ResponseEntity<>("No users Found",HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(allUsers,HttpStatus.ACCEPTED);
        }

    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
