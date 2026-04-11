package com.assetflow.backend.service;

import com.assetflow.backend.domain.User;
import com.assetflow.backend.repository.UserRepository;
import com.assetflow.backend.web.dto.AuthResponse;
import com.assetflow.backend.web.dto.CurrentUserResponse;
import com.assetflow.backend.web.dto.LoginRequest;
import com.assetflow.backend.web.dto.RegisterRequest;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final Map<String, Long> sessionStore = new ConcurrentHashMap<>();

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

    @Transactional(readOnly = true)
    public CurrentUserResponse getCurrentUser(String authorizationHeader) {
        String token = extractBearerToken(authorizationHeader);
        Long userId = sessionStore.get(token);

        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        return new CurrentUserResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName()
        );
    }

    private AuthResponse toResponse(User user) {
        String token = UUID.randomUUID().toString();
        sessionStore.put(token, user.getId());

        return new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                token
        );
    }

    private String extractBearerToken(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing Authorization header");
        }

        String prefix = "Bearer ";
        if (!authorizationHeader.startsWith(prefix) || authorizationHeader.length() <= prefix.length()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Authorization header");
        }

        return authorizationHeader.substring(prefix.length()).trim();
    }
}
