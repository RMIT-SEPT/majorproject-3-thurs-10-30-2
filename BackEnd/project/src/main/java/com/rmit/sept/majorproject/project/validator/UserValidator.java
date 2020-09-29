package com.rmit.sept.majorproject.project.validator;

import com.rmit.sept.majorproject.project.model.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    public static final int MIN_PASSWORD_LENGTH = 6;

    @Override
    public boolean supports(Class<?> givenClass) {
        return User.class.isAssignableFrom(givenClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;

        if (user.getPassword().length() < MIN_PASSWORD_LENGTH) {
            errors.rejectValue("password", "Length", "Password must be at least " + MIN_PASSWORD_LENGTH + " characters");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords do not match");
        }
    }
}
