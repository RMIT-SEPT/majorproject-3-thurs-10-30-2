package com.rmit.sept.majorproject.project.Repositories;

import com.rmit.sept.majorproject.project.model.Business;
import org.springframework.data.repository.CrudRepository;

public interface BusinessRepository extends CrudRepository<Business, Long> {
    @Override
    Iterable<Business> findAllById(Iterable<Long> iterable);
}
