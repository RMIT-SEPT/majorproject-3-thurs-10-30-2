package com.rmit.sept.majorproject.project.web;


import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.model.User;
import com.rmit.sept.majorproject.project.payload.JWTLoginSucessReponse;
import com.rmit.sept.majorproject.project.payload.LoginRequest;
import com.rmit.sept.majorproject.project.security.JwtTokenProvider;
import com.rmit.sept.majorproject.project.services.MapValidationErrorService;
import com.rmit.sept.majorproject.project.services.UserService;
import com.rmit.sept.majorproject.project.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.rmit.sept.majorproject.project.security.SecurityConstants.TOKEN_PREFIX;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        ResponseEntity<?> result = new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        Optional<User> user = userService.get(id);

        if (user.isPresent()) {
            user.get().setPassword("");
            result = ResponseEntity.ok(user);
        }

        return result;
    }

    @GetMapping("search/{name}")
    public ResponseEntity<?> getUser(@PathVariable String name) {
        ResponseEntity<?> result = new ResponseEntity<>("No users found", HttpStatus.NOT_FOUND);
        List<User> users = userService.get(name);

        if (users.size() > 0) {
            result = ResponseEntity.ok(users);
        }

        return result;
    }


    @GetMapping("{id}/bookings")
    public ResponseEntity<?> getUserBookings(@PathVariable Long id) {
        ResponseEntity<?> result;
        Optional<User> user = userService.get(id);

        if (user.isPresent()) {
            User.AccountType accountType = user.get().getAccountType();
            Set<Booking> bookings = new HashSet<>();

            if (accountType == User.AccountType.CUSTOMER) {
                bookings = user.get().getBookingsAsCustomer();
            } else if (accountType == User.AccountType.WORKER) {
                bookings = user.get().getBookingsAsWorker();
            }

            result = ResponseEntity.ok(bookings);
        } else {
            result = new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        return result;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult bindingResult) {
        ResponseEntity<?> result;

        userValidator.validate(user, bindingResult);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorService(bindingResult);

        if (errorMap != null) {
            result = errorMap;
        } else {
            User newUser = userService.saveOrUpdateUser(user);
            result = new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }

        return result;
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        ResponseEntity<?> result;

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationErrorService(bindingResult);

        if (errorMap != null) {
            result = errorMap;
        } else {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

            result = ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
        }

        return result;
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // TODO: Implement security checks before proceeding with deletion.
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
