package com.ssafy.beedly.dto.user.kakao;

import lombok.Data;

@Data
public class KakaoAuccount {

    public Boolean has_email;
    public Boolean email_needs_agreement;
    public Boolean is_email_valid;
    public Boolean is_email_verified;
    public String email;

    public Boolean has_gender;
    public String gender;
    public Boolean gender_needs_agreement;

}
