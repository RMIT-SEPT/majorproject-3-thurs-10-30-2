package com.rmit.sept.majorproject.project.Repositories;

import com.rmit.sept.majorproject.project.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);

}
