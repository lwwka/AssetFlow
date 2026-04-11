package com.assetflow.backend.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionResponse(
        Long id,
        String type,
        String symbol,
        BigDecimal quantity,
        BigDecimal price,
        BigDecimal amount,
        String currency,
        LocalDate tradeDate
) {
}
