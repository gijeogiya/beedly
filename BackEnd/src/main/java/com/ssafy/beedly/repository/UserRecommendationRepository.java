package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.UserRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRecommendationRepository extends JpaRepository<UserRecommendation, Long> {
    List<UserRecommendation> findByUserId(Long userId);

    @Query("select distinct ur from UserRecommendation ur left join fetch ur.recTag where ur.user.id = :userId")
    List<UserRecommendation> findByUserIdWithRecommendation(Long userId);
}
