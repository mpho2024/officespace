package com.office.oficeSpace.auth;

import com.office.oficeSpace.configs.JwtService;
import com.office.oficeSpace.entity.User;
import com.office.oficeSpace.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/**", allowCredentials = "true")
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService service;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/user/id")
    public ResponseEntity<String> getLoggedInUserId(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String userId = jwtService.extractUserId(token);
        return ResponseEntity.ok(userId);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    // New method to delete a user by ID
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String, String>> deleteUserById(@PathVariable String id) { // Change to String
        Map<String, String> response = new HashMap<>();
        try {
            service.deleteUserById(id); // Update to use String
            response.put("message", "User has been deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("Error deleting user with ID {}", id, e);
            response.put("error", "Error deleting user");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
