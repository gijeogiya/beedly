package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.special.product.request.CreateSpecialProductRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.beedly.service.SpecialProductService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value = "기획전 상품 컨트롤러")
public class SpecialProductController {

   private final SpecialProductService specialProductService;

   // 기획전 게시글에 상품 등록 + 이미지
   @ApiOperation(value = "기획전 게시글에 상품 등록", notes = "이미지도 여러개 가능", produces = "multipart/form-data")
   @ApiImplicitParam(name = "boardId", value = "기획전 게시글 식별자")
   @PostMapping("/admin/special/product/board/{boardId}")
   public ResponseEntity createSpecialProduct(@ApiParam(value = "request") @RequestPart CreateSpecialProductRequest request, @ApiParam(value = "images") @RequestPart(required = false) List<MultipartFile> images,
                                              @PathVariable Long boardId) {
      specialProductService.save(request, images, boardId);

      return ResponseEntity.status(HttpStatus.CREATED).build();
   }

}
