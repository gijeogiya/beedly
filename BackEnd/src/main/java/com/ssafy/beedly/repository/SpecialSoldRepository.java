package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.SpecialSold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecialSoldRepository extends JpaRepository<SpecialSold, Long> {

    List<SpecialSold> findBySpecialProductId(Long productId);
}
