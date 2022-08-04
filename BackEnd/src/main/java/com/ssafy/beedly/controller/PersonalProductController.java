package com.ssafy.beedly.controller;

import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import io.swagger.annotations.Api;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.beedly.service.PersonalProductService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value = "상시 상품 컨트롤러")
public class PersonalProductController {
	private final PersonalProductService personalProductService;

	// 상시 상품 등록 + 이미지
	@PostMapping("/personal/product")
	public ResponseEntity<?> saveProductInfo(@ApiIgnore User user, @RequestPart CreatePersonalProductRequest request, @RequestPart(required = false) List<MultipartFile> images){
		personalProductService.save(user, request, images);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}


}
