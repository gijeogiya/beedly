package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.service.PersonalFavoriteService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
public class PersonalFavoriteController {

    private final PersonalFavoriteService personalFavoriteService;

    @ApiOperation(value = "상시 상품에 찜하기", notes = "상시 상품에 찜하기(리턴값으로 찜 식별자 리턴)")
    @ApiImplicitParam(name = "productId", value = "상시 상품 식별자")
    @PostMapping("/favorite/product/{productId}")
    public ResponseEntity<Long> createFavoriteProduct(@ApiIgnore @LoginUser User user, @PathVariable Long productId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personalFavoriteService.createFavoriteProduct(user, productId));
    }

    @ApiOperation(value = "상시 상품에 찜취소", notes = "상시 상품 찜 취소")
    @ApiImplicitParam(name = "favoriteId", value = "찜 식별자")
    @DeleteMapping("/favorite/{favoriteId}")
    public ResponseEntity deleteFavoriteProduct(@ApiIgnore @LoginUser User user, @PathVariable Long favoriteId) {
        personalFavoriteService.deleteFavoriteProduct(user, favoriteId);

        return ResponseEntity.ok().build();
    }

}
