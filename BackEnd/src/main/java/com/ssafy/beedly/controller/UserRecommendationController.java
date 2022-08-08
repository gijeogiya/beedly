package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.SelectedTagsDto;
import com.ssafy.beedly.service.UserRecommendationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("userRecommendation")
@RequiredArgsConstructor
public class UserRecommendationController {
    private final UserRecommendationService userRecommendationService;

    @ApiOperation(value = "유저 취향 태그 등록(수정)", notes = "태그 리스트로 취향 태그 등록(수정도 가능)")
    @PostMapping
    public ResponseEntity<?> saveUserRecommendationTag(@ApiIgnore @LoginUser User user, @RequestBody SelectedTagsDto selectedTagsDto ) {
        System.out.println(selectedTagsDto.getTags().size());
        userRecommendationService.add(user, selectedTagsDto.getTags());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    @PostMapping
//    public void getSelectedTags(@RequestBody SelectedTagsDto tags) {
//
//    }
}
