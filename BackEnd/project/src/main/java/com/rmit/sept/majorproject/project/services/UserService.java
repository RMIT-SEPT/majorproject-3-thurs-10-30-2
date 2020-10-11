package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.UserRepository;
import com.rmit.sept.majorproject.project.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.majorproject.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;



@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Optional<User> get(Long id) {
        return userRepository.findById(id);
    }

    public List<User> get(String name) {
        List<User> results;
        results = userRepository.findByFullNameContainingIgnoreCase(name);
        return results;
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

    public User findById(Long id) {

        User user;

        if (userRepository.findById(id).isPresent()) {
            user = userRepository.findById(id).get();
        } else {
            user = null;
        }
        return user;
    }
    public List<User> getAll(){

        List<User> users = new ArrayList<>();
        Iterable<User> iterable = userRepository.findAll();

        for(User u : iterable){
            users.add(u);
        }
        return users;
    }
}