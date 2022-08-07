package com.ssafy.beedly.dto.user.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuplicatedNicknameResponse {

    @ApiModelProperty(notes = "중복 아니면 true, 중복이면 false")
    private boolean isAvailable;
}

