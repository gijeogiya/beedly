package com.ssafy.beedly.dto.user.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    @ApiModelProperty(example = "이메일")
    private String email;

    @ApiModelProperty(example = "이름(실명)")
    private String name;
    private String nickname;
    private String gender;
    private String tel;
    private String addr;
    private String birthday;

}
