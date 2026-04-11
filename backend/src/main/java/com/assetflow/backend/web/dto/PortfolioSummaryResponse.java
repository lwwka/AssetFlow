package com.assetflow.backend.web.dto;

import java.math.BigDecimal;

public record PortfolioSummaryResponse(
        Long portfolioId,
        String portfolioName,
        String baseCurrency,
        BigDecimal totalCostBasis,
        int holdingsCount,
        boolean marketDataAvailable
) {
}
