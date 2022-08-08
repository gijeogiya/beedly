package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

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
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/personalProduct")
@RequiredArgsConstructor
@Api(value = "상시 상품 컨트롤러")
public class PersonalProductController {
	private final PersonalProductService personalProductService;

	// 상시 상품 등록 + 이미지
	@ApiOperation(value = "상시 상품 등록", notes = "이미지도 여러개 가능(최대 5개) \n" +
			"상품 등록 데이터 요청 데이터:\n request: {\n" +
			"  \"productName\": \"기획전 상품\",\n" +
			"  \"productDesc\": \"기획전 상품이에요오오오\",\n" +
			"  \"startPrice\": 50000,\n" +
			"  \"height\": 5,\n" +
			"  \"weight\": 5,\n" +
			"  \"depth\": 5,\n" +
			" \"startTime\": \"2013-09-29T18:46:19Z,\"\n " +
			"  \"categoryId\": 1,\n" +
			" \" brightness : 3,\" " +
			" \" saturation : 2,\" " +
			" \" temperature : 0\" " +
			"}", produces = "multipart/form-data")
	@PostMapping
	public ResponseEntity<?> saveProductInfo(@ApiIgnore @LoginUser User user, @RequestPart CreatePersonalProductRequest request, @RequestPart(required = false) List<MultipartFile> images){
		personalProductService.save(user, request, images);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	// 1-2. 상품 업데이트
	@ApiOperation(value = "상시 상품 수정", notes = "이미지도 여러개 가능(최대 5개) \n" +
			"상품 등록 데이터 요청 데이터:\n request: {\n" +
			"  \"productName\": \"기획전 상품\",\n" +
			"  \"productDesc\": \"기획전 상품이에요오오오\",\n" +
			"  \"startPrice\": 50000,\n" +
			"  \"height\": 5,\n" +
			"  \"weight\": 5,\n" +
			"  \"depth\": 5,\n" +
			" \"startTime\": \"2013-09-29T18:46:19Z,\"\n " +
			"  \"categoryId\": 1,\n" +
			" \" brightness : 3,\" " +
			" \" saturation : 2,\" " +
			" \" temperature : 0\" " +
			"}", produces = "multipart/form-data")
	@ApiImplicitParam(name = "productId", value = "상시 상품 식별자")
	@PatchMapping("/{productId}")
	public ResponseEntity<?> updateProductInfo(@ApiIgnore @LoginUser User user, @RequestPart CreatePersonalProductRequest request
			, @RequestPart(required = false) List<MultipartFile> images,  @PathVariable Long productId){
		personalProductService.update(user, request, images, productId);
		return  ResponseEntity.status(HttpStatus.OK).build();
	}
	// 1-3. 상픔 삭제
	@ApiOperation(value = "상시 상품 삭제", notes = "상시 상품 삭제")
	@ApiImplicitParam(name = "productId", value = "상시 상품 식별자")
	@DeleteMapping("/{productId}")
	public ResponseEntity<?> deleteProductInfo(@PathVariable Long productId){
		personalProductService.delete(productId);
		return  ResponseEntity.status(HttpStatus.OK).build();
	}
	// 1-4. 상품 조회
	@GetMapping("/{productId}")
	public ResponseEntity<?> getProductInfo(@PathVariable("productId") Long id) throws Exception{
		System.out.println(id);
		PersonalProductDto dto = personalProductService.getProductById(id);
		System.out.println(dto);
		return ResponseEntity.ok(dto);
	}

	 // 1-4-1. 상품 상세 조회
	 @GetMapping("/close/{id}/{productId}")
	 public ResponseEntity<?> getProductInfoClose(@LoginUser User user, @PathVariable("productId") Long productId){
	 	return ResponseEntity.ok(personalProductService.getProductByIdClose(user.getId(), productId));
	 }

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
