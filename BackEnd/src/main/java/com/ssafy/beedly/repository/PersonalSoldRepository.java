package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalSold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonalSoldRepository extends JpaRepository<PersonalSold, Long> {

    List<PersonalSold> findByPersonalProductId(Long productId);
}
