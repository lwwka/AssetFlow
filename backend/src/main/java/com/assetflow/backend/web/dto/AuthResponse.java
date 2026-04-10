package com.assetflow.backend.web.dto;

public record AuthResponse(
        Long userId,
        String email,
        String fullName,
        String token
) {
}
