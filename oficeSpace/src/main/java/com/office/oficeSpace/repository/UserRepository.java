package com.office.oficeSpace.repository;

import com.office.oficeSpace.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> { // Use String for the ID type
    Optional<User> findByEmail(String email);
    Optional<User> findByResetToken(String resetToken);
}
