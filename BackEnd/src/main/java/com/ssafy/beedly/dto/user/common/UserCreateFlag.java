package com.ssafy.beedly.dto.user.common;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateFlag {

    @ApiModelProperty(notes = "회원가입된거면true 바로 로그인된거면 false")
    private boolean createFlag;
    @ApiModelProperty(notes = "jwt 토큰(Header에도 있는데 일단 줌ㅋㅋ)")
    private String accessToken;

    @ApiModelProperty(notes = "회원가입 됐을때 기본정보")
    private UserDefaultDto userDefaultDto;

    @ApiModelProperty(notes = "유저 식별자")
    private Long userId;

    @ApiModelProperty(notes = "유저 이름")
    private String userName;

    @ApiModelProperty(notes = "유저 닉네임")
    private String userNickname;

}
