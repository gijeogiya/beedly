package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.tag.common.RecommendationTagDto;
import com.ssafy.beedly.service.RecommendationTagService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommendationtag")
public class RecommendationTagController {

    private final RecommendationTagService recommendationTagService;

    @ApiOperation(value = "추천 태그 리스트 조회", notes = "추천 태그 리스트 전체 조회")
    @GetMapping
    public ResponseEntity<List<RecommendationTagDto>> findRecommendationTagList() {
        return ResponseEntity.ok(recommendationTagService.findRecommendationTagList());
    }
}
