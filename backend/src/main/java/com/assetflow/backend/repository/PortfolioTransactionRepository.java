package com.assetflow.backend.repository;

import com.assetflow.backend.domain.PortfolioTransaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioTransactionRepository extends JpaRepository<PortfolioTransaction, Long> {
    List<PortfolioTransaction> findByHoldingIdOrderByTradeDateDesc(Long holdingId);
}
