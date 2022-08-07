package com.ssafy.beedly.dto.user.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {


    @ApiModelProperty(example = "이름(실명)")
    private String name;

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "전화번호")
    private String tel;

    @ApiModelProperty(example = "풀주소")
    private String addr;

    @ApiModelProperty(example = "생년월일(YYYY-MM-DD)")
    private LocalDate birthday;

}
