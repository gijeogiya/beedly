package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PersonalBidRepository extends JpaRepository<PersonalBid, Long> {

    Optional<PersonalBid> findFirstByPersonalProductIdOrderByBidPriceDesc(Long productId);
}
