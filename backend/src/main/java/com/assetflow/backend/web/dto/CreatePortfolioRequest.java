package com.assetflow.backend.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreatePortfolioRequest(
        @NotNull Long userId,
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Size(min = 3, max = 3) String baseCurrency
) {
}
