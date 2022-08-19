package com.ssafy.beedly.service;

import com.ssafy.beedly.dto.tag.common.RecommendationTagDto;
import com.ssafy.beedly.repository.RecommendationTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecommendationTagService {

    private final RecommendationTagRepository recommendationTagRepository;
    public List<RecommendationTagDto> findRecommendationTagList() {
        return recommendationTagRepository.findAll().stream().map(recommendationTag -> new RecommendationTagDto(recommendationTag))
                .collect(Collectors.toList());
    }
}
