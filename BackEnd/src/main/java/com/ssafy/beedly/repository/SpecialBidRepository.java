package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.SpecialBid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpecialBidRepository extends JpaRepository<SpecialBid, Long> {

    Optional<SpecialBid> findFirstBySpecialProductIdOrderByBidPriceDesc(Long productId);
}
