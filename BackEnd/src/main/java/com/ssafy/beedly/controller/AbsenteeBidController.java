package com.ssafy.beedly.controller;


import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.AbsenteeBidDto;
import com.ssafy.beedly.dto.bid.request.AbsenteeBidPriceRequest;
import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.dto.bid.response.AbsenteeBidResponse;
import com.ssafy.beedly.service.AbsenteeBidService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("absenteeBid")
@RequiredArgsConstructor
public class AbsenteeBidController {
    private final AbsenteeBidService absenteeBidService;

    @ApiOperation(value = "상품에 서면응찰 등록", notes = "상시 경매 상품에 서면응찰 등록")
    @PostMapping("/product/{productId}")
    public ResponseEntity<?> saveAbsenteeBidInfo(@ApiIgnore @LoginUser User user, @RequestBody AbsenteeBidPriceRequest absenteeBidPrice, @PathVariable Long productId) {
        System.out.println(absenteeBidPrice.getAbsenteeBidPrice());
        absenteeBidService.save(user, absenteeBidPrice.getAbsenteeBidPrice(), productId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "서면응찰 수정", notes = "서면응찰 식별자로 서면응찰 가격 수정")
    @ApiImplicitParam(name = "absenteeBidId", value = "서면 응찰 식별자")
    @PatchMapping("/{absenteeBidId}")
    public ResponseEntity<?> updateAbsenteeBidInfo(@PathVariable Long absenteeBidId, @RequestBody AbsenteeBidPriceRequest absenteeBidPrice) {
        absenteeBidService.update(absenteeBidId, absenteeBidPrice.getAbsenteeBidPrice());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @ApiOperation(value = "서면응찰 삭제", notes = "서면응찰 식별자로 서면응찰 취소")
    @ApiImplicitParam(name = "absenteeBidId", value = "서면 응찰 식별자")
    @DeleteMapping("/{absenteeBidId}")
    public ResponseEntity<?> deleteAbsenteeBidInfo(@PathVariable Long absenteeBidId) {
        absenteeBidService.delete(absenteeBidId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
