package com.rmit.sept.majorproject.project.web;

import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import com.rmit.sept.majorproject.project.services.BusinessHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/BusinessHours")
public class BusinessHoursController {

    @Autowired
    private BusinessHoursService businessHoursService;

    @PostMapping("")
    public ResponseEntity<?> createNewBusinessHours(@Valid @RequestBody BusinessHours businessHours, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

        BusinessHours businessHours1 = businessHoursService.saveOrUpdateBusinessHours(businessHours); //tmp user
        return new ResponseEntity<>(businessHours, HttpStatus.CREATED);
    }

//    @DeleteMapping("{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
//        businessHoursService.delete(id);
//        return ResponseEntity.noContent().build();
//    }

}
