package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.service.PayService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay")
public class PayController {

    private final PayService payService;

    @ApiOperation(value = "상시 상품 낙찰된거 결제하기", notes = "낙찰 식별자로 결제하기")
    @ApiImplicitParam(name = "soldId", value = "상시 낙찰 식별자")
    @PostMapping("/personal/sold/{soldId}")
    public ResponseEntity payPersonalSold(@ApiIgnore @LoginUser User user, @PathVariable Long soldId) {
        payService.payPersonalSold(user, soldId);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "기획전 상품 낙찰된거 결제하기", notes = "낙찰 식별자로 결제하기")
    @ApiImplicitParam(name = "soldId", value = "기획전 낙찰 식별자")
    @PostMapping("/special/sold/{soldId}")
    public ResponseEntity paySpecialSold(@ApiIgnore @LoginUser User user, @PathVariable Long soldId) {
        payService.paySpecialSold(user, soldId);

        return ResponseEntity.ok().build();
    }
}
