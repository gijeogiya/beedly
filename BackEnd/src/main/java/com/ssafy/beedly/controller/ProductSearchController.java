package com.ssafy.beedly.controller;

import java.util.List;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
	@ApiOperation(value = "상품명으로 상품 리스트 검색", notes = "쿼리스트링으로 productName 받아서 상품 리스트들 페이징으로 반환 \n"
	+ "기본으로 최신순, 20개씩 반환\n"
	+ "sort, size는 필수 아님. page로 원하는 페이지 조회\n"
	+ "무한 스크롤로 구현할거니 처음에는 page=0으로 조회하고 응답 데이터 중에 last가 false면 다음페이지 불러오는 형식으로 하면 될듯")
	@ApiImplicitParam(name = "productName", value = "상품명", paramType = "query", dataType = "String")
	@GetMapping("product")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByProductName(@RequestParam("productName")String productName,
																			 @PageableDefault(sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable){
		return ResponseEntity.ok(productSearchService.getProductByProductName(productName, pageable));
	}

	// 2. 작가 닉네임으로 상품을 검색
	@ApiOperation(value = "작가 닉네임으로 상품 리스트 검색", notes = "쿼리스트링으로 userNickname 받아서 상품 리스트들 페이징으로 반환 \n"
			+ "기본으로 최신순, 20개씩 반환\n"
			+ "sort, size는 필수 아님. page로 원하는 페이지 조회\n"
			+ "무한 스크롤로 구현할거니 처음에는 page=0으로 조회하고 응답 데이터 중에 last가 false면 다음페이지 불러오는 형식으로 하면 될듯")
	@ApiImplicitParam(name = "userNickname", value = "작가 닉네임", paramType = "query", dataType = "String")
	@GetMapping("")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByProductNickname(@RequestParam("userNickname")String userNickname,
																				 @PageableDefault(sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable){
		return ResponseEntity.ok(productSearchService.getProductByNickname(userNickname, pageable));
	}

	// 3. 태그로 검색
	@ApiOperation(value = "검색 태그명으로 상품 리스트 검색", notes = "쿼리스트링으로 tag 받아서 상품 리스트들 페이징으로 반환\n"
			+ "기본으로 최신순, 20개씩 반환\n"
			+ "sort, size는 필수 아님. page로 원하는 페이지 조회\n"
			+ "무한 스크롤로 구현할거니 처음에는 page=0으로 조회하고 응답 데이터 중에 last가 false면 다음페이지 불러오는 형식으로 하면 될듯")
	@ApiImplicitParam(name = "tag", value = "검색 태그명", paramType = "query", dataType = "String")
	@GetMapping("tag")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByTag(@RequestParam("tag")String tagName,
																	 @PageableDefault(sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable){
		System.out.println(tagName);
		return ResponseEntity.ok(productSearchService.getProductByTag(tagName, pageable));
	}

	// 4. 종료된작품 검색
	@ApiOperation(value = "작가 식별자로 상품 리스트 검색", notes = "쿼리스트링으로 artistId 받아서 상품 리스트들 페이징으로 반환\n"
			+ "기본으로 최신순, 20개씩 반환\n"
			+ "sort, size는 필수 아님. page로 원하는 페이지 조회\n"
			+ "무한 스크롤로 구현할거니 처음에는 page=0으로 조회하고 응답 데이터 중에 last가 false면 다음페이지 불러오는 형식으로 하면 될듯")
	@ApiImplicitParam(name = "artistId", value = "작가 식별자", paramType = "query", dataType = "Long")
	@GetMapping("artist")
	public ResponseEntity<Slice<PersonalProductDto>> getProductByTerminated(@RequestParam("artistId")Long artistId,
																			@PageableDefault(sort="createdDate", direction = Sort.Direction.DESC) Pageable pageable){
		return ResponseEntity.ok(productSearchService.getProductByTerminated(artistId, pageable));
	}
}
