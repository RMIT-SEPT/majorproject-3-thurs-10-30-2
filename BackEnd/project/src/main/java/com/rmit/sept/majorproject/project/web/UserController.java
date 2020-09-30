package com.rmit.sept.majorproject.project.web;


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

import static com.rmit.sept.majorproject.project.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

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
