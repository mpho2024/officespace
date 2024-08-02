package com.office.oficeSpace.auth;
import com.office.oficeSpace.configs.JwtService;

import com.office.oficeSpace.entity.Role;
import com.office.oficeSpace.entity.User;
import com.office.oficeSpace.repository.UserRepository;
import lombok.Builder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

@Builder

public class AuthenticationService {
    private final UserRepository repository;
private final PasswordEncoder passwordEncoder;
private final JwtService jwtService;
private final AuthenticationManager authenticationManager;

public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
    this.repository = repository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
}

public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.valueOf(request.getRole())) // Assign role from the request
            .build();
    repository.save(user);
    var jwtToken = jwtService.generateToken(user, user.getId(), user.getRole());
    return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
}

public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
    var jwtToken = jwtService.generateToken(user, user.getId(), user.getRole());
    return AuthenticationResponse.builder()
            .token(jwtToken)
            .message("Login Successful")
            .status("OK")
            .build();
}

public String getLoggedInUserEmail() {
    var authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }
    return null;
}

// New method to get all users
public List<User> getAllUsers() {
    return repository.findAll();
}

public void deleteUserById(Integer userId) {
    // Find the user by ID
    var user = repository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    // Delete the user from the repository
    repository.delete(user);
}
}