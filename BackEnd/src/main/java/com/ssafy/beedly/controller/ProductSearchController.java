package com.ssafy.beedly.controller;

import java.util.List;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
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
	@ApiOperation(value = "상품명으로 상품 리스트 검색", notes = "쿼리스트링으로 productName 받아서 상품 리스트들 페이징으로 반환")
	@ApiImplicitParam(name = "productName", value = "상품명")
	@GetMapping("product")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByProductName(@RequestParam("productName")String productName){
		return ResponseEntity.ok(productSearchService.getProductByProductName(productName));
	}

	// 2. 작가 닉네임으로 상품을 검색
	@ApiOperation(value = "작가 닉네임으로 상품 리스트 검색", notes = "쿼리스트링으로 userNickname 받아서 상품 리스트들 페이징으로 반환")
	@ApiImplicitParam(name = "userNickname", value = "작가 닉네임")
	@GetMapping("")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByProductNickname(@RequestParam("userNickname")String userNickname){
		return ResponseEntity.ok(productSearchService.getProductByNickname(userNickname));
	}

	// 3. 태그로 검색
	@ApiOperation(value = "검색 태그명으로 상품 리스트 검색", notes = "쿼리스트링으로 tag 받아서 상품 리스트들 페이징으로 반환")
	@ApiImplicitParam(name = "tag", value = "검색 태그명")
	@GetMapping("tag")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByTag(@RequestParam("tag")String tagName){
		System.out.println(tagName);
		return ResponseEntity.ok(productSearchService.getProductByTag(tagName));
	}

	// 4. 종료된작품 검색
	@ApiOperation(value = "작가 식별자로 상품 리스트 검색", notes = "쿼리스트링으로 artistId 받아서 상품 리스트들 페이징으로 반환")
	@ApiImplicitParam(name = "artistId", value = "작가 식별자")
	@GetMapping("artist")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByTerminated(@RequestParam("artistId")Long artistId){
		return ResponseEntity.ok(productSearchService.getProductByTerminated(artistId));
	}
}
