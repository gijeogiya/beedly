package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalSold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonalSoldRepository extends JpaRepository<PersonalSold, Long> {

    List<PersonalSold> findByPersonalProductId(Long productId);

    Optional<PersonalSold> findPersonalSoldByPersonalProductId(Long productId);
}
