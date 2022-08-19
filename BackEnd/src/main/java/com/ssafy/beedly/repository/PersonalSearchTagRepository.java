package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalSearchTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonalSearchTagRepository extends JpaRepository<PersonalSearchTag, Long> {

    List<PersonalSearchTag> findByPersonalProductId(Long productId);
}
