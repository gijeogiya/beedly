package com.ssafy.beedly.dto.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    private String email;
    private String name;
    private String nickname;
    private String gender;
    private String tel;
    private String addr;
    private String birthday;

}
