package com.assetflow.backend.web.dto;

public record PortfolioResponse(
        Long id,
        String name,
        String baseCurrency,
        Long userId
) {
}
