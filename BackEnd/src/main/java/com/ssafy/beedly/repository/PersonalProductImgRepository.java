package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalProductImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonalProductImgRepository extends JpaRepository<PersonalProductImg, Long> {

    List<PersonalProductImg> findAllByPersonalProductId(Long productId);
}
