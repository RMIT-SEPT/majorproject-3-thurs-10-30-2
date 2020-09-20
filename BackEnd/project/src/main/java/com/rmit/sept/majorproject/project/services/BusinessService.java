package com.rmit.sept.majorproject.project.services;

import com.rmit.sept.majorproject.project.Repositories.BusinessRepository;
import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessService {
    @Autowired
    private BusinessRepository businessRepository;

    public Business saveOrUpdateBusiness(Business business){

        if(!(business.getName().isEmpty()) && hoursCheck(business) && dupe_Name(business)){
            return businessRepository.save(business);
        }
        return null;
    }

    public List<Business> all(){

        List<Business> businesses = new ArrayList<>();
        Iterable<Business> iterable = businessRepository.findAll();

        for(Business b : iterable){
            businesses.add(b);
        }
        return businesses;
    }

    public Business findById(long id){

        Business businessReturn;

        if(businessRepository.findById(id).isPresent()) {
            businessReturn = businessRepository.findById(id).get();
        }else{
            businessReturn = null;
        }
        return businessReturn;
    }

    public void delete(Long id) {
        businessRepository.deleteById(id);
    }

    private boolean hoursCheck(Business business){
        List<BusinessHours> hours = business.getBusinessHours();
        if(!(hours.isEmpty())){
            for(BusinessHours hoursTemp : hours) {
                if (!(hoursTemp.getStartTime().isBefore(hoursTemp.getEndTime()))) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean dupe_Name(Business business){
        List<Business> all = all();

        for(Business businessTemp : all) {
            if (business.getName().equals(businessTemp.getName())) {
                return false;
            }
        }
        return true;
    }

}