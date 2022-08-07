package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.SpecialProductImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecialProductImgRepository extends JpaRepository<SpecialProductImg, Long> {

    List<SpecialProductImg> findAllBySpecialProductId(Long productId);
}
