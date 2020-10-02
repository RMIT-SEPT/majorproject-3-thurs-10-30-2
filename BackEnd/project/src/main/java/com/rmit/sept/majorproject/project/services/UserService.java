package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.UserRepository;
import com.rmit.sept.majorproject.project.model.Booking;
import com.rmit.sept.majorproject.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Booking> getBookingsAsWorker(Long id, User accountType) {
        List<Booking> workerBookings = accountType.getWorkerBookings();
        if (userRepository.findById(id).equals(accountType.getId())) {
                return workerBookings;
        }
        else {
            return null;
        }
    }
}