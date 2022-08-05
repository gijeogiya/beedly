package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.AbsenteeBidDto;
import com.ssafy.beedly.dto.bid.request.AbsenteeBidPriceRequest;
import com.ssafy.beedly.service.AbsenteeBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/absenteeBid")
@RequiredArgsConstructor
public class AbsenteeBidController {
    private final AbsenteeBidService absenteeBidService;

    @PostMapping("/product/{productId}")
    public ResponseEntity<?> saveAbsenteeBidInfo(@ApiIgnore @LoginUser User user, @RequestBody AbsenteeBidPriceRequest absenteeBidPrice, @PathVariable Long productId) {
        System.out.println(absenteeBidPrice.getAbsenteeBidPrice());
        absenteeBidService.save(user, absenteeBidPrice.getAbsenteeBidPrice(), productId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/{absenteeBidId}")
    public ResponseEntity<?> updateAbsenteeBidInfo(@PathVariable Long absenteeBidId, @RequestBody AbsenteeBidPriceRequest absenteeBidPrice) {
        absenteeBidService.update(absenteeBidId, absenteeBidPrice.getAbsenteeBidPrice());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{absenteeBidId}")
    public ResponseEntity<?> deleteAbsenteeBidInfo(@PathVariable Long absenteeBidId) {
        absenteeBidService.delete(absenteeBidId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
