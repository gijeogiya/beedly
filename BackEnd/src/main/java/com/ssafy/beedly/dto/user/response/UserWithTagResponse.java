package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.UserRecommendation;
import com.ssafy.beedly.dto.tag.common.RecommendationTagDto;
import com.ssafy.beedly.dto.tag.common.SearchTagDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithTagResponse {

    private Long userId;
    private String userEmail;
    private String userName;
    private String userNickname;
    private String userGender;
    private String userTel;
    private String userAddr;
    private LocalDate userBirthday;
    private String userRole;
    private List<RecommendationTagDto> recommendationTagDtos = new ArrayList<>();

    public UserWithTagResponse(User u, List<UserRecommendation> ur) {
        this.userId = u.getId();
        this.userEmail = u.getUserEmail();
        this.userName = u.getUserName();
        this.userNickname = u.getUserNickname();
        this.userGender = u.getUserGender().toString();
        this.userTel = u.getUserTel();
        this.userAddr = u.getUserAddr();
        this.userBirthday = u.getUserBirthday();
        this.userRole = u.getUserRole().toString();
        this.recommendationTagDtos = ur.stream().map(userRecommendation -> new RecommendationTagDto(userRecommendation)).collect(Collectors.toList());
    }
}

