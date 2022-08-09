package com.ssafy.beedly.dto.user.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateFlag {

    private boolean createFlag;
    private String accessToken;

    private UserDefaultDto userDefaultDto;

    private Long userId;

}
