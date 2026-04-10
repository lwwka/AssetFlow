package com.assetflow.backend.web;

import com.assetflow.backend.service.PortfolioService;
import com.assetflow.backend.web.dto.CreatePortfolioRequest;
import com.assetflow.backend.web.dto.PortfolioResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PortfolioResponse create(@Valid @RequestBody CreatePortfolioRequest request) {
        return portfolioService.create(request);
    }

    @GetMapping("/user/{userId}")
    public List<PortfolioResponse> getByUser(@PathVariable Long userId) {
        return portfolioService.findByUser(userId);
    }
}
