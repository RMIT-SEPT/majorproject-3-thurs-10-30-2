package com.rmit.sept.majorproject.project.Repositories;

import com.rmit.sept.majorproject.project.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);

    @Override
    Optional<User> findById(Long id);

    List<User> findByFullNameContainingIgnoreCaseAndAccountType(String fullName, User.AccountType AccountType);

    User findByUsername(String username);
}
