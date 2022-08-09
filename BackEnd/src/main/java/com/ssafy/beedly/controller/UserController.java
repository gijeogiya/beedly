package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.AuctionType;
import com.ssafy.beedly.dto.bid.response.AbsenteeBidResponse;
import com.ssafy.beedly.dto.user.common.UserCreateFlag;
import com.ssafy.beedly.dto.user.kakao.KakaoUserResponse;
import com.ssafy.beedly.dto.user.request.UserCreateRequest;
import com.ssafy.beedly.dto.user.request.UserLoginRequest;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import com.ssafy.beedly.dto.user.response.DuplicatedNicknameResponse;
import com.ssafy.beedly.dto.user.response.UserPurchaseResponse;
import com.ssafy.beedly.dto.user.response.UserSalesResponse;
import com.ssafy.beedly.dto.user.response.UserWithTagResponse;
import com.ssafy.beedly.service.AbsenteeBidService;
import com.ssafy.beedly.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@Api(value = "유저 컨트롤러")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AbsenteeBidService absenteeBidService;

    // 카카오 로그인
    @ApiOperation(value = "카카오 로그인", notes = "인가 코드를 받아서 서버에 넘겨주세요")
    @ApiImplicitParam(name = "code", value = "카카오 로그인 api로 받은 인가 코드값")
    @PostMapping("/login")
    public ResponseEntity<UserCreateFlag> kakaoLogin(@RequestParam String code) {
        String kakaoAccessToken = userService.getKakaoAccessToken(code);
        KakaoUserResponse kakaoUserInfo = userService.getKakaoUserInfo(kakaoAccessToken);
        UserCreateFlag userCreateFlag = userService.kakaoLogin(kakaoUserInfo);
        String accessToken = userCreateFlag.getAccessToken();
        userCreateFlag.setAccessToken(null);

        if (userCreateFlag.isCreateFlag()) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .header(HttpHeaders.AUTHORIZATION, accessToken)
                    .body(userCreateFlag);
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.AUTHORIZATION, accessToken)
                    .body(userCreateFlag);
        }
    }

    // 회원정보 수정
    @ApiOperation(value = "회원정보 입력", notes = "첫 회원가입 때 회원정보 입력")
    @PatchMapping("/info")
    public ResponseEntity updateUserInfo(@ApiIgnore @LoginUser User user,
                                     @RequestBody UserUpdateRequest request) {
        userService.updateUser(request, user);
        return ResponseEntity.ok().build();
    }

    // 내 정보 + 취향 태그
    @ApiOperation(value = "내 정보 조회 + 내 취향태그", notes = "내 정보 + 내 취향태그")
    @GetMapping
    public ResponseEntity<UserWithTagResponse> getUserInfo(@ApiIgnore @LoginUser User user) {
        return ResponseEntity.ok(userService.getUserInfo(user));
    }

    // 닉네임 중복검사 (중복이면 true)
    @ApiOperation(value = "닉네임 중복검사", notes = "중복이면 true, 사용 가능하면 false")
    @GetMapping("/check")
    public ResponseEntity<DuplicatedNicknameResponse> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkDuplicatedNickname(nickname));
    }

    // 구매내역 조회
    @ApiOperation(value = "내 구매내역 조회")
    @GetMapping("/purchase")
    public ResponseEntity<List<UserPurchaseResponse>> searchMyPurchases(@ApiIgnore @LoginUser User user) {
        return ResponseEntity.ok(userService.searchMyPurchases(user));
    }

    // 판매내역 조회
    @ApiOperation(value = "내 판매내역 조회")
    @GetMapping("/sale")
    public ResponseEntity<List<UserSalesResponse>> searchMySales(@ApiIgnore @LoginUser User user) {
        return ResponseEntity.ok(userService.searchMySales(user));
    }

    // 구매내역 결제정보 조회
    @ApiOperation(value = "구매상품 결제정보 조회")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "productSoldId", value = "상품 식별자(productId)가 아닌 판매 식별자(productSoldId)"),
            @ApiImplicitParam(name = "auctionType", value = "상시 경매 상품이면 P, 기획전 경매 상품이면 S")
    }
    )
    @GetMapping("/purchase/{productSoldId}")
    public ResponseEntity<?> searchPurchasePaidInfo(@ApiIgnore @LoginUser User user, @PathVariable Long productSoldId, @RequestParam String auctionType) {
        if (auctionType.equals(AuctionType.P.toString())) {
            return ResponseEntity.ok(userService.searchPersonalPurchasePaidInfo(productSoldId, user));
        } else if (auctionType.equals(AuctionType.S.toString())) {
            return ResponseEntity.ok(userService.searchSpecialPurchasePaidInfo(productSoldId, user));
        }
        return null;
    }

    // 내가 서면 응찰한 상품목록
    @ApiOperation(value = "내가 서면 응찰한 상품 목록", notes = "내가 서면 응찰한 상품 리스트들")
    @GetMapping("/absenteebid")
    public ResponseEntity<List<AbsenteeBidResponse>> findMyAbsenteeBidList(@ApiIgnore @LoginUser User user) {
        return ResponseEntity.ok(absenteeBidService.findMyAbsenteeBidList(user));
    }

    // 카카오 리다이렉트 url 인가 코드 받아오기 + 로그인 처리(백엔드 테스트용)
    @ApiOperation(value = "백엔드 테스트용")
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
