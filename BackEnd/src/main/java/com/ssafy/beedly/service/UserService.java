package com.ssafy.beedly.service;

import com.ssafy.beedly.client.KakaoLoginApi;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.config.security.util.JwtUtil;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.user.common.UserCreateFlag;
import com.ssafy.beedly.dto.user.kakao.KakaoUserResponse;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import com.ssafy.beedly.dto.user.response.*;
import com.ssafy.beedly.repository.UserRepository;
import com.ssafy.beedly.repository.query.UserQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.ssafy.beedly.common.exception.NotFoundException.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    @Value("${kakao.restapikey}")
    private String restApiKey;

    private final UserRepository userRepository;
    private final UserQueryRepository userQueryRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    // 카카오 로그인
    @Transactional
    public UserCreateFlag kakaoLogin(KakaoUserResponse kakaoUserInfo) {
        Long kakaoId = Long.valueOf(kakaoUserInfo.getId());
        Optional<User> findUser = userRepository.findByKakaoId(kakaoId);
        Long userId;
        UserCreateFlag userCreateFlag = new UserCreateFlag();
        if (!findUser.isPresent()) { // 유저정보 없으면 회원가입 후 토큰 발급
            User saveUser = userRepository.save(User.createUser(kakaoId));
            userId = saveUser.getId();
            userCreateFlag.setCreateFlag(true);

            // 관리자 계정 가입시키는거 로직 추가해야댐.

        } else { // 유저정보 있으면 바로 토큰 발급
            userId = findUser.get().getId();
            userCreateFlag.setCreateFlag(false);
        }
        userCreateFlag.setAccessToken(jwtUtil.createToken(userId));
        return userCreateFlag;
    }

    public String getKakaoAccessToken(String code) {
        return KakaoLoginApi.getKakaoAccessToken(restApiKey, code);
    }

    public KakaoUserResponse getKakaoUserInfo(String kakaoAccessToken) {
        return KakaoLoginApi.getKakaoUserInfo(kakaoAccessToken);
    }

    // 회원 정보 수정
    @Transactional
    public void updateUser(UserUpdateRequest request, User user) {
        User findUser = validateUser(user);
        findUser.updateUser(request);
    }

    // 내 정보 조회(유저 취향 같이)
    public UserWithTagResponse getUserInfo(User user) {
        User findUser = validateUser(user);

        return null;
    }

    // 닉네임 중복 체크
    public DuplicatedNicknameResponse checkDuplicatedNickname(String nickname) {
        Optional<User> duplicatedUser = userRepository.findByUserNickname(nickname);
        if (duplicatedUser.isPresent()) {
            return new DuplicatedNicknameResponse(true);
        } else {
            return new DuplicatedNicknameResponse(false);
        }
    }

    // 내 구매내역 리스트
    public List<UserPurchaseResponse> searchMyPurchases(User user) {
        User findUser = validateUser(user);
        List<UserPurchaseResponse> userPersonalPurchaseResponses = userQueryRepository.searchUserPersonalPurchaces(findUser.getId());
        List<UserPurchaseResponse> userSpecialPurchaseResponses = userQueryRepository.searchUserSpecialPurchaces(findUser.getId());

        return Stream.concat(userPersonalPurchaseResponses.stream(), userSpecialPurchaseResponses.stream()).collect(Collectors.toList());
    }

    // 내 판매내역 리스트
    public List<UserSalesResponse> searchMySales(User user) {
        User findUser = validateUser(user);
        List<PersonalProduct> personalProducts = userQueryRepository.searchUserSales(user.getId());

        return personalProducts.stream()
                .map(personalProduct -> new UserSalesResponse(personalProduct))
                .collect(Collectors.toList());
    }

    // 상시 구매내역 결제정보 조회
    public UserPurchasePaidResponse searchPersonalPurchasePaidInfo(Long productSoldId, User user) {
        // 본인 구매내역 맞는지 방어로직 추가하기
        return new UserPurchasePaidResponse(userQueryRepository.searchPersonalPurchasePaidInfo(productSoldId));
    }

    // 기획전 구매내역 결제정보 조회
    public UserPurchasePaidResponse searchSpecialPurchasePaidInfo(Long productSoldId, User user) {
        // 본인 구매내역 맞는지 방어로직 추가하기
        return new UserPurchasePaidResponse(userQueryRepository.searchSpecialPurchasePaidInfo(productSoldId));
    }

    /* ******************************* 연습코드 ********************************* */

//    @Transactional
//    public void createUser(UserCreateRequest request) {
//        if(userRepository.findByUserEmail(request.getEmail()).isPresent()){
//            throw new DuplicateException("이미 가입된 회원입니다.");
//        }
//
//        User user = User.createUser_temp(request.getEmail(), passwordEncoder.encode(request.getPw()), request.getName());
//        userRepository.save(user);
//    }
//
//    public String loginUser(UserLoginRequest request) {
//
//        User findUser = userRepository.findByUserEmail(request.getEmail())
//                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
//
//        if(!passwordEncoder.matches(request.getPw(), findUser.getUserPw())){
//            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
//        }
//
//        return jwtUtil.createToken(findUser.getId());
//    }

    public User validateUser(User user) {
        User findUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        return findUser;
    }
}
