package com.ssafy.beedly.dto.user.common;

import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.Gender;
import com.ssafy.beedly.domain.type.UserRole;
import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(notes = "구매자 식별자")
    private Long userId;

    @ApiModelProperty(notes = "구매자 이메일")
    private String userEmail;

    @ApiModelProperty(notes = "구매자 이름")
    private String userName;

    @ApiModelProperty(notes = "구매자 닉네임")
    private String userNickname;

    @ApiModelProperty(notes = "구매자 성별")
    private Gender userGender;

    @ApiModelProperty(notes = "구매자 전화번호")
    private String userTel;

    @ApiModelProperty(notes = "구매자 주소")
    private String userAddr;

    @ApiModelProperty(notes = "구매자 생일")
    private LocalDate userBirthday;

    @ApiModelProperty(notes = "구매자 롤")
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
