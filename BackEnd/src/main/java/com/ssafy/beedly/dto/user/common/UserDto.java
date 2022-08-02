package com.ssafy.beedly.dto.user.common;

import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.Gender;
import com.ssafy.beedly.domain.type.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long userId;
    private String userEmail;
    private String userName;
    private String userNickname;
    private Gender userGender;
    private String userTel;
    private String userAddr;
    private LocalDate userBirthday;
    private UserRole userRole;

    public UserDto(User u) {
        this.userId = u.getId();
        this.userEmail = u.getUserEmail();
        this.userName = u.getUserName();
        this.userNickname = u.getUserNickname();
        this.userGender = u.getUserGender();
        this.userTel = u.getUserTel();
        this.userAddr = u.getUserAddr();
        this.userBirthday = u.getUserBirthday();
        this.userRole = u.getUserRole();
    }
}
