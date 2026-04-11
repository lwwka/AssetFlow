package com.assetflow.backend.repository;

import com.assetflow.backend.domain.PortfolioTransaction;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioTransactionRepository extends JpaRepository<PortfolioTransaction, Long> {
    List<PortfolioTransaction> findByHoldingIdOrderByTradeDateDesc(Long holdingId);

    @Query("""
            select t
            from PortfolioTransaction t
            join fetch t.holding h
            join fetch h.portfolio p
            where p.id = :portfolioId
            order by t.tradeDate desc, t.createdAt desc
            """)
    List<PortfolioTransaction> findByPortfolioIdOrderByTradeDateDesc(@Param("portfolioId") Long portfolioId);
}
