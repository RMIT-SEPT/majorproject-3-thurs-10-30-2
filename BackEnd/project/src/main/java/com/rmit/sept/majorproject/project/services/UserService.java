package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.UserRepository;
import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user) {
        return userRepository.save(user);
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