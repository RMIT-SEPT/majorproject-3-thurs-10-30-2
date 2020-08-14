package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.UserRepository;
import com.rmit.sept.majorproject.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user){
        //TODO: implement save and update logic
        if(user.getName().length() > 2) {
            return userRepository.save(user);
        }
        return null;
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

}
