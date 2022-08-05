package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.UserRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRecommendationRepository extends JpaRepository<UserRecommendation, Long> {

}
