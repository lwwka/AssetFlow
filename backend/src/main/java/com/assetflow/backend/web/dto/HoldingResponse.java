package com.assetflow.backend.web.dto;

import java.math.BigDecimal;

public record HoldingResponse(
        Long id,
        String symbol,
        String assetType,
        BigDecimal quantity,
        BigDecimal averageCost,
        String currency,
        BigDecimal costBasis
) {
}
