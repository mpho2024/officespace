package com.office.oficeSpace.services;

import com.office.oficeSpace.entity.User;
import com.office.oficeSpace.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;


public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

}
