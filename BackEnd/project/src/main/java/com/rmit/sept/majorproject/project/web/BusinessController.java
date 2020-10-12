package com.rmit.sept.majorproject.project.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHolder;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import com.rmit.sept.majorproject.project.model.User;
import com.rmit.sept.majorproject.project.services.BusinessService;
import com.rmit.sept.majorproject.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

@CrossOrigin
@RestController
@RequestMapping("/api/Business")
public class BusinessController {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private BusinessService businessService;
    @Autowired
    private UserService userService;

    @GetMapping("")
    ResponseEntity<?> all() {

        List<Business> allBusinesses = businessService.all();
        if (allBusinesses.isEmpty()) {
            return new ResponseEntity<>("No Businesses Found", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(allBusinesses, HttpStatus.ACCEPTED);
        }

    }

    @GetMapping("/{id}")
    ResponseEntity<?> one(@PathVariable Long id) {

        if (businessService.findById(id) != null) {
            return new ResponseEntity<>(businessService.findById(id), HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>("ID Does Not Exist", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createNewBusiness(@RequestBody BusinessHolder holder, BindingResult result) {
        for (BusinessHours hours : holder.getBusinessHours()) {
            holder.getBusiness().setBusinessHours(hours);
        }
        Business business1 = businessService.saveOrUpdateBusiness(holder.getBusiness()); //tmp user

        return new ResponseEntity<>(business1, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBusiness(@RequestBody BusinessHolder holder, @PathVariable Long id) {
        Business oldBusiness = businessService.findById(id);
        oldBusiness.setName(holder.getBusiness().getName());
        oldBusiness.removeAllBusinessHours();
        for (BusinessHours hours : holder.getBusinessHours()) {
            oldBusiness.setBusinessHours(hours);
        }
        Business business1 = businessService.saveOrUpdateBusiness(oldBusiness);

        return new ResponseEntity<>(business1, HttpStatus.CREATED);
    }

    @PutMapping("{businessId}/add_employee/{empId}")
    public ResponseEntity<?> addEmployee(@PathVariable Long businessId, @PathVariable Long empId) {
        Business business = businessService.findById(businessId);
        User employee = userService.findById(empId);
        if (employee.getAccountType() == User.AccountType.WORKER) {
            employee.setEmployer(business);
            User updatedEmployee = userService.saveOrUpdateUser(employee);
            business.addEmployee(updatedEmployee);
            Business updatedBusiness = businessService.saveOrUpdateBusiness(business);
            return ResponseEntity.ok(updatedBusiness);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PatchMapping(path = "{id}", consumes = "application/json-patch+json")
    public ResponseEntity<?> patchBusiness(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Business business = businessService.findById(id);
            Business businessPatched = applyPatchToBusiness(patch, business);
            businessService.saveOrUpdateBusiness(businessPatched);
            return ResponseEntity.ok(businessPatched);
        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // TODO: Implement security checks before proceeding with deletion.
        businessService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private Business applyPatchToBusiness(JsonPatch patch, Business targetBusiness) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(targetBusiness, JsonNode.class));
        return objectMapper.treeToValue(patched, Business.class);
    }

}
