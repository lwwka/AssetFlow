package com.assetflow.backend.web.dto;

public record CurrentUserResponse(
        Long userId,
        String email,
        String fullName
) {
}
