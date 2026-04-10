package com.assetflow.backend.service;

import com.assetflow.backend.domain.User;
import com.assetflow.backend.repository.UserRepository;
import com.assetflow.backend.web.dto.AuthResponse;
import com.assetflow.backend.web.dto.LoginRequest;
import com.assetflow.backend.web.dto.RegisterRequest;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        userRepository.findByEmail(request.email()).ifPresent(existing -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        });

        User user = new User();
        user.setEmail(request.email().trim().toLowerCase());
        user.setPasswordHash("{noop}" + request.password());
        user.setFullName(request.fullName().trim());

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (!user.getPasswordHash().equals("{noop}" + request.password())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return toResponse(user);
    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                UUID.randomUUID().toString()
        );
    }
}
