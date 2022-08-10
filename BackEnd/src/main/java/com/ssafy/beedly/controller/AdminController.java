package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.service.AdminService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;


    // 1. 작가 신청 받기
    @ApiOperation(value = "작가 신청서 받기", notes = "작가 신청서를 받아서 artist승인 테이블에 승인 여부 false로 저장")
    @GetMapping("/application")
    ResponseEntity<?> setArtistApplication(@LoginUser User user){
        adminService.saveArtistApplication(user.getId());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 2. 작가 등급 올려주기
    @ApiOperation(value = "작가 승인해서 등급올리기", notes = "작가 승인 한 후에, 등급 올리고 artist테이블에 정보 추가")
    @ApiImplicitParam(name = "userId", value = "유저아이디", paramType = "path", dataType = "Long")
    @PatchMapping("updgrade/{userId}")
    ResponseEntity<?> upgradeArtist(@PathVariable Long userId){
        adminService.upgradeArtist(userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
