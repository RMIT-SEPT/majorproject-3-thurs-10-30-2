package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.BusinessRepository;
import com.rmit.sept.majorproject.project.model.Business;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessService {
    @Autowired
    private BusinessRepository businessRepository;

    public Business saveOrUpdateBusiness(Business business){
        return businessRepository.save(business);
    }

    public void delete(Long id) {
        businessRepository.deleteById(id);
    }

}
