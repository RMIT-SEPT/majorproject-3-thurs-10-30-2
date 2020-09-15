package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.BusinessHoursRepository;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessHoursService {
    @Autowired
    private BusinessHoursRepository businessHoursRepository;

    public BusinessHours saveOrUpdateBusinessHours(BusinessHours businessHours){
        return businessHoursRepository.save(businessHours);
    }

}
