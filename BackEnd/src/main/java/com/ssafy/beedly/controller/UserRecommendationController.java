package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.SelectedTagsDto;
import com.ssafy.beedly.service.UserRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("userRecommendation")
@RequiredArgsConstructor
public class UserRecommendationController {
    private final UserRecommendationService userRecommendationService;

    @PostMapping
    public ResponseEntity<?> saveUserRecommendationTag(@LoginUser User user, @RequestBody SelectedTagsDto selectedTagsDto ) {
        userRecommendationService.add(user, selectedTagsDto.getTags());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    @PostMapping
//    public void getSelectedTags(@RequestBody SelectedTagsDto tags) {
//        asdasdasda
//    }
}
