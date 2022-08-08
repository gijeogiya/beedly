package com.ssafy.beedly.service;

import com.ssafy.beedly.common.algorithm.Node;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.UserRecommendation;
import com.ssafy.beedly.dto.PersonalProductDto;
import com.ssafy.beedly.repository.PersonalProductRepository;
import com.ssafy.beedly.repository.RecommendationTagRepository;
import com.ssafy.beedly.repository.UserRecommendationRepository;
import com.ssafy.beedly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.PriorityQueue;

import static com.ssafy.beedly.common.exception.NotFoundException.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserRecommendationService {

    private final UserRecommendationRepository userRecommendationRepository;
    private final RecommendationTagRepository recommendationTagRepository;
    private final UserRepository userRepository;
    private final PersonalProductRepository personalProductRepository;

    @Transactional
    public void add(User user, List<Long> tags) {
        delete(user);
        int userScore = 0;
        for (Long tag: tags) {
            RecommendationTag recommendationTag = recommendationTagRepository.findById(tag)
                    .orElseThrow(() -> new NotFoundException(TAG_NOT_FOUND));
            UserRecommendation userRecommendation = UserRecommendation.createUserRecommendation(user, recommendationTag);
            userRecommendationRepository.save(userRecommendation);
//            userScore += recommendationTag.getRecTagBrightness() + recommendationTag.getRecTagSaturation() + recommendationTag.getRecTagTemperature();
            User findUser = userRepository.findById(user.getId())
                    .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
            findUser.updateScore(recommendationTag.getRecTagBrightness(), recommendationTag.getRecTagSaturation(), recommendationTag.getRecTagTemperature());
        }
    }

    @Transactional
    public void delete(User user) {
        List<UserRecommendation> result = userRecommendationRepository.findByUserId(user.getId());
        if(!result.isEmpty()) userRecommendationRepository.deleteAllInBatch(result);
    }

    @Transactional
    public List<PersonalProductDto> getRecommendedProduct(User user) {

        double score_b = (double)user.getUserBrightness();
        double score_s = (double)user.getUserSaturation();
        double score_t = (double)user.getUserTemperature();
        double b,s,t,distance;
        List<PersonalProduct> productList = personalProductRepository.findAll();
        PriorityQueue<Node> pq = new PriorityQueue<>();
        for (PersonalProduct p: productList
             ) {
            b = (double)p.getBrightness();
            s = (double)p.getSaturation();
            t = (double)p.getTemperature();
            distance = Math.sqrt(Math.pow((score_b - p.getBrightness()),2) + Math.pow((score_s - p.getSaturation()),2) + Math.pow((score_t - p.getTemperature()),2));
            pq.add(new Node(distance, p.getId()));
        }

        List<PersonalProductDto> recommendProduct = new ArrayList<>();
        int idx = 0;
        while(!pq.isEmpty()) {
            if(idx >= 20) break;
            Long id = pq.poll().productId;
            PersonalProduct personalProduct = personalProductRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));
            recommendProduct.add(new PersonalProductDto(personalProduct));
            idx++;
        }
        return recommendProduct;
    }

}