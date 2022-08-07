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


    @ApiModelProperty(notes = "이름(실명)")
    private String name;

    @ApiModelProperty(notes = "닉네임")
    private String nickname;

    @ApiModelProperty(notes = "전화번호")
    private String tel;

    @ApiModelProperty(notes = "풀주소")
    private String addr;

    @ApiModelProperty(example = "1998-02-07", notes = "생년월일(YYYY-MM-DD)")
    private LocalDate birthday;

}
