package com.ssafy.beedly.controller;

import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.service.AbsenteeBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("absenteeBid")
@RequiredArgsConstructor
public class AbsenteeBidController {
    private final AbsenteeBidService absenteeBidService;

    @PostMapping
    public ResponseEntity<?> saveAbsenteeBidInfo(@RequestBody AbsenteeBid absenteeBid) {
        absenteeBidService.save(absenteeBid);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
