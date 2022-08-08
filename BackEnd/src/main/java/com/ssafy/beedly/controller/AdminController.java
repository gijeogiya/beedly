package com.ssafy.beedly.controller;

import com.ssafy.beedly.service.AdminService;
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
    @GetMapping("/application/{artistId}")
    ResponseEntity<?> setArtistApplication(@PathVariable Long artistId){
        adminService.saveArtistApplication(artistId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 2. 작가 등급 올려주기
    @PatchMapping("updgrade/{artistId}")
    ResponseEntity<?> upgradeArtist(@PathVariable Long artistId){
        adminService.upgradeArtist(artistId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
