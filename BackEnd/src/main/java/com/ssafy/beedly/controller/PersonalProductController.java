package com.ssafy.beedly.controller;


import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.dto.PersonalProductDto;
import com.ssafy.beedly.service.PersonalProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("personalProduct")
@RequiredArgsConstructor
public class PersonalProductController {
	private final PersonalProductService personalProductService;

	// 1. personalProduct CRUD
	// 1-1. 상품 저장
	@PostMapping
	public ResponseEntity<?> saveProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.save(personalProduct);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	// 1-2. 상품 업데이트
	@PatchMapping
	public ResponseEntity<?> updateProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.update(personalProduct);
		return  ResponseEntity.status(HttpStatus.OK).build();
	}
	// 1-3. 상픔 삭제
	@DeleteMapping
	public ResponseEntity<?> deleteProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.delete(personalProduct);
		return  ResponseEntity.status(HttpStatus.OK).build();
	}
	// 1-4. 상품 조회
	@GetMapping("/{id}")
	public ResponseEntity<?>getProductInfo(@PathVariable("id") Long id) throws Exception{
		System.out.println(id);
		PersonalProductDto dto = personalProductService.getProductById(id);
		System.out.println(dto);
		return ResponseEntity.ok(dto);
	}

	// // 1-4-1. 상품 상세 조회
	// @GetMapping("/close/{id}")
	// public ResponseEntity<?> getProductInfoClose(@PathVariable("id") Long id){
	// 	return ResponseEntity.ok(personalProductService.getProductByIdClose(id));
	// }

	// 2. 카테고리 별 SLICE로 product가져오기
	//http://localhost:8080/personalProduct/list?categoryName=""&page=0&sort=startTime,DESC
	@GetMapping("/list")
	public ResponseEntity<?> getProductInfoByCategory(@RequestParam("categoryName") String category,  Pageable pageable) throws Exception{
		return ResponseEntity.ok(personalProductService.getProductByCategory(category, pageable));
	}

	// 3. 카테고리 별 SLICE로 진행중인 product가져오기
	//http://localhost:8080/personalProduct/list/onAir?page=0&size=2&sort=startTime,DESC
	@GetMapping("/list/onAir")
	public ResponseEntity<?> getProductInfoOnAirByCategory(@RequestParam("categoryName") String category,  Pageable pageable) throws Exception{
		return ResponseEntity.ok(personalProductService.getProductOnAirByCategory(category, pageable));
	}

	// 4. 상품 사이즈별로 조회
	@GetMapping("/size/{width}/{height}")
	public ResponseEntity<?> getProductInfoBySize(@PathVariable("width") Integer width, @PathVariable("height") Integer height, Pageable pageable){
		return ResponseEntity.ok(personalProductService.getProductBySize(width, height, pageable));
	}


}
