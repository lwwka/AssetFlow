package com.assetflow.backend.service;

import com.assetflow.backend.domain.Portfolio;
import com.assetflow.backend.domain.User;
import com.assetflow.backend.repository.PortfolioRepository;
import com.assetflow.backend.repository.UserRepository;
import com.assetflow.backend.web.dto.CreatePortfolioRequest;
import com.assetflow.backend.web.dto.PortfolioResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public PortfolioService(PortfolioRepository portfolioRepository, UserRepository userRepository) {
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
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

    private PortfolioResponse toResponse(Portfolio portfolio) {
        return new PortfolioResponse(
                portfolio.getId(),
                portfolio.getName(),
                portfolio.getBaseCurrency(),
                portfolio.getUser().getId()
        );
    }
}
