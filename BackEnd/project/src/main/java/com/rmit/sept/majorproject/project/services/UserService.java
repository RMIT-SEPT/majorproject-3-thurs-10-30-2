package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.UserRepository;
import com.rmit.sept.majorproject.project.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.majorproject.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Optional<User> get(Long id) {
        return userRepository.findById(id);
    }

    public User saveOrUpdateUser(User user) {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setConfirmPassword("");
            return userRepository.save(user);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username " + user.getUsername() + " already exists.");
        }

    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

}
