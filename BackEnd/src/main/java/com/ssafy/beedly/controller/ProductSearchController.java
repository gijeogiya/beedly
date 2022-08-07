package com.ssafy.beedly.controller;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.dto.PersonalProductDto;
import com.ssafy.beedly.repository.ProductSearchRepository;
import com.ssafy.beedly.service.ProductSearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class ProductSearchController {

	private final ProductSearchService productSearchService;

	// 1. 작품명으로 검색
	@GetMapping("product")
	public ResponseEntity<?> getProductByProductName(@RequestParam("productName")String productName){
		return ResponseEntity.ok(productSearchService.getProductByProductName(productName));
	}

	// 2. 작가 닉네임으로 상품을 검색
	@GetMapping("")
	public ResponseEntity<?> getProductByProductNickname(@RequestParam("userNickname")String userNickname){
		return ResponseEntity.ok(productSearchService.getProductByNickname(userNickname));
	}

	// 3. 태그로 검색
	@GetMapping("tag")
	public ResponseEntity<?> getProductByTag(@RequestParam("tag")String tagName){
		System.out.println(tagName);
		return ResponseEntity.ok(productSearchService.getProductByTag(tagName));
	}

	// 4. 종료된작품 검색
	@GetMapping("artist")
	public ResponseEntity<?> getProductByTerminated(@RequestParam("artistId")Long artistId){
		return ResponseEntity.ok(productSearchService.getProductByTerminated(artistId));
	}
}
