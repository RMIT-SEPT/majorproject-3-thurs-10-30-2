package com.rmit.sept.majorproject.project.web;

import com.rmit.sept.majorproject.project.model.Business;
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

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@Valid @RequestBody Business business, BindingResult result){
        if(result.hasErrors()) {
            return new ResponseEntity<>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

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
