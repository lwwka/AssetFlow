package com.assetflow.backend.service;

import com.assetflow.backend.domain.Portfolio;
import com.assetflow.backend.domain.User;
import com.assetflow.backend.repository.HoldingRepository;
import com.assetflow.backend.repository.PortfolioRepository;
import com.assetflow.backend.repository.PortfolioTransactionRepository;
import com.assetflow.backend.repository.UserRepository;
import com.assetflow.backend.web.dto.CreatePortfolioRequest;
import com.assetflow.backend.web.dto.HoldingResponse;
import com.assetflow.backend.web.dto.PortfolioResponse;
import com.assetflow.backend.web.dto.PortfolioSummaryResponse;
import com.assetflow.backend.web.dto.TransactionResponse;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final HoldingRepository holdingRepository;
    private final PortfolioTransactionRepository portfolioTransactionRepository;

    public PortfolioService(
            PortfolioRepository portfolioRepository,
            UserRepository userRepository,
            HoldingRepository holdingRepository,
            PortfolioTransactionRepository portfolioTransactionRepository
    ) {
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
        this.holdingRepository = holdingRepository;
        this.portfolioTransactionRepository = portfolioTransactionRepository;
    }

    @Transactional
    public PortfolioResponse create(CreatePortfolioRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Portfolio portfolio = new Portfolio();
        portfolio.setUser(user);
        portfolio.setName(request.name().trim());
        portfolio.setBaseCurrency(request.baseCurrency().trim().toUpperCase());

        return toResponse(portfolioRepository.save(portfolio));
    }

    @Transactional(readOnly = true)
    public List<PortfolioResponse> findByUser(Long userId) {
        return portfolioRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PortfolioSummaryResponse getSummary(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        var holdings = holdingRepository.findByPortfolioId(portfolioId);

        BigDecimal totalCostBasis = holdings.stream()
                .map(holding -> holding.getQuantity().multiply(holding.getAverageCost()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int holdingsCount = holdings.size();

        return new PortfolioSummaryResponse(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getBaseCurrency(),
                totalCostBasis,
                holdingsCount,
                false
        );
    }

    @Transactional(readOnly = true)
    public List<HoldingResponse> findHoldingsByPortfolio(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        return holdingRepository.findByPortfolioId(portfolio.getId()).stream()
                .map(holding -> new HoldingResponse(
                        holding.getId(),
                        holding.getSymbol(),
                        holding.getAssetType().name(),
                        holding.getQuantity(),
                        holding.getAverageCost(),
                        holding.getCurrency(),
                        holding.getQuantity().multiply(holding.getAverageCost())
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TransactionResponse> findTransactionsByPortfolio(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio not found"));

        return portfolioTransactionRepository.findByPortfolioIdOrderByTradeDateDesc(portfolio.getId()).stream()
                .map(transaction -> new TransactionResponse(
                        transaction.getId(),
                        transaction.getType().name(),
                        transaction.getHolding().getSymbol(),
                        transaction.getQuantity(),
                        transaction.getPrice(),
                        transaction.getQuantity().multiply(transaction.getPrice()),
                        transaction.getHolding().getCurrency(),
                        transaction.getTradeDate()
                ))
                .toList();
    }

    private PortfolioResponse toResponse(Portfolio portfolio) {
        return new PortfolioResponse(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getBaseCurrency(),
                portfolio.getUser().getId()
        );
    }
}
