package com.rmit.sept.majorproject.project.Repositories;

import com.rmit.sept.majorproject.project.model.Business;
import com.rmit.sept.majorproject.project.model.BusinessHours;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BusinessHoursRepository extends CrudRepository<BusinessHours, Long> {

    //List<BusinessHours> findByBusiness(Business business, Sort sort);

}
