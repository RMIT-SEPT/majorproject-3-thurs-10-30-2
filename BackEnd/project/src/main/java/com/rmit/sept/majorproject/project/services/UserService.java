package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.UserRepository;
import com.rmit.sept.majorproject.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user) {

        // TODO: This validation needs to be moved to the model
        // Email Regex
        // String regex = "(.+)@(.+)$";
        // Pattern pattern = Pattern.compile(regex);
        // Matcher matcher = pattern.matcher(user.getEmail());
        // if(matcher.matches()) 
      
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

}
