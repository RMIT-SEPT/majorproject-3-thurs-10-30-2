package com.rmit.sept.majorproject.project.web;

import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHolder;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import com.rmit.sept.majorproject.project.services.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
/*
   Post requests should be of the format
  {
    "business": {
        "name": "Test"
    },
    "businessHours": [
        {
            "dayOfWeek": "MONDAY",
            "startTime": "09:00",
            "endTime": "17:00"
        },
        {
            "dayOfWeek": "TUESDAY",
            "startTime": "09:00",
            "endTime": "17:00"
        }
    ]
}
*/
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/Business")
public class BusinessController {

    @Autowired
    private BusinessService businessService;

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@RequestBody BusinessHolder holder, BindingResult result){
        for (BusinessHours hours: holder.getBusinessHours()) {
            holder.getBusiness().setBusinessHours(hours);
        }
        Business business1 = businessService.saveOrUpdateBusiness(holder.getBusiness()); //tmp user

        return new ResponseEntity<>(business1, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBusiness(@RequestBody BusinessHolder holder, @PathVariable Long id){
        for (BusinessHours hours: holder.getBusinessHours()) {
            holder.getBusiness().setBusinessHours(hours);
        }
        Business business1 = businessService.saveOrUpdateBusiness(holder.getBusiness()); //tmp user

        return new ResponseEntity<>(business1, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // TODO: Implement security checks before proceeding with deletion.
        businessService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
