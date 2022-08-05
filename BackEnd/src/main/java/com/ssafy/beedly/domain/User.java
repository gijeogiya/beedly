package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.Gender;
import com.ssafy.beedly.domain.type.UserRole;
import com.ssafy.beedly.domain.type.YN;
import com.ssafy.beedly.dto.user.kakao.KakaoAuccount;
import com.ssafy.beedly.dto.user.kakao.KakaoUserResponse;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "USER")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

//    private String userPw;

    @Column(name = "kakao_id")
    private Long kakaoId;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_gender")
    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column(name = "user_tel")
    private String userTel;

    @Column(name = "user_addr")
    private String userAddr;

    @Column(name = "user_bday")
    private LocalDate userBirthday;

    @Column(name = "user_score")
    private Integer userScore;

//    private LocalDateTime userDeleteDate;
//
//    @Enumerated(EnumType.STRING)
//    private YN userDeletedYn;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

//    public static User createUser_temp(String email, String pw, String name){
//        User user = new User();
//        user.userEmail = email;
//        user.userPw = pw;
//        user.userName = name;
//        user.userRole = UserRole.ROLE_USER;
//        return user;
//    }

    public static User createUser(KakaoUserResponse kakao){
        User user = new User();
        KakaoAuccount kakaoAuccount = kakao.getKakao_account();

        user.kakaoId = kakao.getId();
        user.userName = "구매자";
        user.userEmail = kakaoAuccount.getEmail();
        user.userGender = kakaoAuccount.getGender().equals("male") ? Gender.M : Gender.F;
        user.userRole = UserRole.ROLE_USER;
        return user;
    }

    public void updateUser(UserUpdateRequest request) {
        this.userName = request.getName();
        this.userNickname = request.getNickname();
        this.userTel = request.getTel();
        this.userAddr = request.getAddr();
        this.userBirthday = request.getBirthday();
    }
}
