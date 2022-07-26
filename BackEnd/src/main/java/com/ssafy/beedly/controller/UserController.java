package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.user.kakao.KakaoUserResponse;
import com.ssafy.beedly.dto.user.request.UserCreateRequest;
import com.ssafy.beedly.dto.user.request.UserLoginRequest;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import com.ssafy.beedly.dto.user.response.DuplicatedNicknameResponse;
import com.ssafy.beedly.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 카카오 로그인
    @PostMapping("/login")
    public ResponseEntity<?> kakaoLogin(@RequestParam String code) {
        String kakaoAccessToken = userService.getKakaoAccessToken(code);
        KakaoUserResponse kakaoUserInfo = userService.getKakaoUserInfo(kakaoAccessToken);
        String accessToken = userService.kakaoLogin(kakaoUserInfo);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .build();
    }

    // 회원정보 수정
    @PatchMapping("/info")
    public ResponseEntity updateUserInfo(@LoginUser User user,
                                     @RequestBody UserUpdateRequest request) {
        userService.updateUser(request, user);
        return ResponseEntity.ok().build();
    }

    // 내 정보 + 취향 태그
    @GetMapping
    public ResponseEntity<?> getUserInfo(@LoginUser User user) {
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

    // 닉네임 중복검사 (중복이면 true)
    @GetMapping("/check")
    public ResponseEntity<DuplicatedNicknameResponse> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkDuplicatedNickname(nickname));
    }

    // 구매내역 조회
    @GetMapping("/purchase")
    public ResponseEntity<?> searchMyPurchases(@LoginUser User user) {
        return ResponseEntity.ok(userService.searchMyPurchases(user));
    }


    // 카카오 리다이렉트 url 인가 코드 받아오기 + 로그인 처리(백엔드 테스트용)
    @GetMapping("/kakao/callback")
    public void kakaoCallback(@RequestParam String code) {
        System.out.println("인가 코드 : " + code);
//        String kakaoAccessToken = userService.getKakaoAccessToken(code);
//        KakaoUserResponse kakaoUserInfo = userService.getKakaoUserInfo(kakaoAccessToken);
//        String accessToken = userService.kakaoLogin(kakaoUserInfo);
//
//        return ResponseEntity.status(HttpStatus.OK)
//                .header(HttpHeaders.AUTHORIZATION, accessToken)
//                .build();
    }

    /* ********************* 카카오 로그인 api 열리기 전에 연습 코드 *********************** */
//    @PostMapping("/users")
//    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateRequest request){
//        userService.createUser(request);
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/users/login")
//    public ResponseEntity<Void> loginUser(@RequestBody @Valid UserLoginRequest request){
//        String accessToken = userService.loginUser(request);
//        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, accessToken).build();
//    }
//
//    @PatchMapping("/users")
//    public ResponseEntity<Void> updateUserInfo(@LoginUser User user,
//                                           @RequestBody @Valid UserUpdateRequest request){
//        userService.updateUser(request, user);
//        return ResponseEntity.ok().build();
//    }

}
