package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.UserRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendationTagRepository extends JpaRepository<RecommendationTag, Long> {

}
