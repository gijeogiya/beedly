package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.DuplicateException;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.config.security.util.JwtUtil;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.user.request.UserCreateRequest;
import com.ssafy.beedly.dto.user.request.UserLoginRequest;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import com.ssafy.beedly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.beedly.common.exception.NotFoundException.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    @Transactional
    public void createUser(UserCreateRequest request) {
        if(userRepository.findByUserEmail(request.getEmail()).isPresent()){
            throw new DuplicateException("이미 가입된 회원입니다.");
        }

        User user = User.createUser(request.getEmail(), passwordEncoder.encode(request.getPw()), request.getName());
        userRepository.save(user);
    }

    public String loginUser(UserLoginRequest request) {

        User findUser = userRepository.findByUserEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        if(!passwordEncoder.matches(request.getPw(), findUser.getUserPw())){
            throw new NotMatchException("회원의 비밀번호가 일치하지 않습니다.");
        }

        return jwtUtil.createToken(findUser.getId());
    }

    @Transactional
    public void updateUser(UserUpdateRequest request, User user) {

        User findUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        findUser.updateUser(request.getName());
    }
}
