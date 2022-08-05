package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.UserRecommendation;
import com.ssafy.beedly.repository.RecommendationTagRepository;
import com.ssafy.beedly.repository.UserRecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.beedly.common.exception.NotFoundException.TAG_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotFoundException.USER_NOT_FOUND;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserRecommendationService {

    private final UserRecommendationRepository userRecommendationRepository;
    private final RecommendationTagRepository recommendationTagRepository;

    public void add(User user, List<Long> tags) {
        delete(user);
        for (Long tag: tags) {
            RecommendationTag recommendationTag = recommendationTagRepository.findById(tag)
                    .orElseThrow(() -> new NotFoundException(TAG_NOT_FOUND));
            UserRecommendation userRecommendation = UserRecommendation.createUserRecommendation(user, recommendationTag);
        }

    }

    public void delete(User user) {
        UserRecommendation userRecommendation = userRecommendationRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        userRecommendationRepository.delete(userRecommendation);
    }


}