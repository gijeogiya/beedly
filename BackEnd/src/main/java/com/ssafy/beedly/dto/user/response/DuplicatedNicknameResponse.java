package com.ssafy.beedly.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuplicatedNicknameResponse {

    private boolean isAvailable;
}

