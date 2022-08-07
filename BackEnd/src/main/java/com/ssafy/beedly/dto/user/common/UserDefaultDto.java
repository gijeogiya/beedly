package com.ssafy.beedly.dto.user.common;

import com.ssafy.beedly.domain.type.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDefaultDto {

    private String userEmail;
    private Gender userGender;

}
