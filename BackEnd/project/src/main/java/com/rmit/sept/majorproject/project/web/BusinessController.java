package com.rmit.sept.majorproject.project.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import com.rmit.sept.majorproject.project.services.BusinessHoursService;
import com.rmit.sept.majorproject.project.services.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/Business")
public class BusinessController {

    @Autowired
    private BusinessService businessService;
    private BusinessHoursService businessHoursService;

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@RequestBody String string){

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        JsonNode node = null;
        try {
            node = mapper.readTree(string);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Business business = mapper.convertValue(node.get("business"), Business.class);
        BusinessHours businessHours = mapper.convertValue(node.get("business_hours"), BusinessHours.class);
        business.setBusinessHours(businessHours);
        //businessHours.setBusiness(business);


//        if(result.hasErrors()) {
//            return new ResponseEntity<>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
//        }
//
        Business business1 = businessService.saveOrUpdateBusiness(business); //tmp user

        return new ResponseEntity<>(business, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // TODO: Implement security checks before proceeding with deletion.
        businessService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
