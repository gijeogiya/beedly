package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.user.request.UserCreateRequest;
import com.ssafy.beedly.dto.user.request.UserLoginRequest;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import com.ssafy.beedly.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateRequest request){
        userService.createUser(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/login")
    public ResponseEntity<Void> loginUser(@RequestBody @Valid UserLoginRequest request){
        String accessToken = userService.loginUser(request);
        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, accessToken).build();
    }

    @PatchMapping("/users")
    public ResponseEntity<Void> updateUser(@LoginUser User user,
                                           @RequestBody @Valid UserUpdateRequest request){
        userService.updateUser(request, user);
        return ResponseEntity.ok().build();
    }

}
