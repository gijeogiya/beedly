package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.AbsenteeBidDto;
import com.ssafy.beedly.service.AbsenteeBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/absentee")
@RequiredArgsConstructor
public class AbsenteeBidController {
    private final AbsenteeBidService absenteeBidService;

    @PostMapping("/product/{productId}")
    public ResponseEntity<?> saveAbsenteeBidInfo(@LoginUser User user, @RequestBody Integer absenteeBidPrice, @PathVariable Long productId) {
        absenteeBidService.save(user, absenteeBidPrice, productId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public ResponseEntity<?> updateAbsenteeBidInfo(@PathVariable AbsenteeBid absenteeBid, @RequestBody Integer newPrice) {
        absenteeBidService.update(absenteeBid, newPrice);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
