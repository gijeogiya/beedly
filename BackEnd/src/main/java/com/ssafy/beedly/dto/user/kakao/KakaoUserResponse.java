package com.ssafy.beedly.dto.user.kakao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KakaoUserResponse {

    public Long id;
    public String connected_at;

}