package com.rmit.sept.majorproject.project.Repositories;

import com.rmit.sept.majorproject.project.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);

    @Override
    Optional<User> findById(Long id);

    User findByUsername(String username);

}
