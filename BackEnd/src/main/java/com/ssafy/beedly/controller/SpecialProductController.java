package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.special.product.request.CreateSpecialProductRequest;
import io.swagger.annotations.*;
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
   @ApiOperation(value = "기획전 게시글에 상품 등록", notes = "이미지도 여러개 가능(최대 5개) \n" +
           "상품 등록 데이터 request:\n {\n" +
           "  \"productName\": \"기획전 상품\",\n" +
           "  \"productDesc\": \"기획전 상품이에요오오오\",\n" +
           "  \"startPrice\": 50000,\n" +
           "  \"height\": 5,\n" +
           "  \"weight\": 5,\n" +
           "  \"depth\": 5,\n" +
           "  \"artistName\": \"moonsk\",\n" +
           "  \"categoryId\": 1\n" +
           "}", produces = "multipart/form-data")
   @ApiImplicitParam(name = "boardId", value = "기획전 게시글 식별자")
   @PostMapping("/admin/special/product/board/{boardId}")
   public ResponseEntity createSpecialProduct(@RequestPart CreateSpecialProductRequest request, @RequestPart(required = false) List<MultipartFile> images,
                                              @PathVariable Long boardId) {
      specialProductService.save(request, images, boardId);

      return ResponseEntity.status(HttpStatus.CREATED).build();
   }

   // 기획전 상품 수정
   @ApiOperation(value = "기획전 상품 수정", notes = "이미지도 여러개 가능(최대 5개) \n" +
           "상품 등록 데이터 request:\n {\n" +
           "  \"productName\": \"기획전 상품\",\n" +
           "  \"productDesc\": \"기획전 상품이에요오오오\",\n" +
           "  \"startPrice\": 50000,\n" +
           "  \"height\": 5,\n" +
           "  \"weight\": 5,\n" +
           "  \"depth\": 5,\n" +
           "  \"artistName\": \"moonsk\",\n" +
           "  \"categoryId\": 1\n" +
           "}", produces = "multipart/form-data")
   @ApiImplicitParam(name = "productId", value = "기획전 상품 식별자")
   @PatchMapping("/admin/special/product/{productId}")
   public ResponseEntity updateSpecialProduct(@RequestPart CreateSpecialProductRequest request, @RequestPart(required = false) List<MultipartFile> images,
                                              @PathVariable Long productId) {
      specialProductService.update(request, images, productId);

      return ResponseEntity.status(HttpStatus.OK).build();
   }

   // 기획전 상품 삭제
   @DeleteMapping("/admin/special/product/{productId}")
   public ResponseEntity deleteSpecialProduct(@PathVariable Long productId) {
      specialProductService.delete(productId);

      return ResponseEntity.ok().build();
   }

}
