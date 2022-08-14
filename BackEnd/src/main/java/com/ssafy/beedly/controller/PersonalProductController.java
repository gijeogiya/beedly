package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.PersonalProductCloseDto;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
		"  \"width\": 5,\n" +
		"  \"depth\": 5,\n" +
		" \"startTime\": \"2013-09-29T18:46:19Z,\"\n " +
		"  \"categoryId\": 1,\n" +
		" \" brightness\" : 3,\n " +
		" \" saturation\" : 2,\n " +
		" \" temperature\" : 0\n " +
			" \" searchTags\" : [1, 2, 7, 9] " +
		"}", produces = "multipart/form-data")
	@PostMapping
	public ResponseEntity<?> saveProductInfo(@ApiIgnore @LoginUser User user, @RequestPart CreatePersonalProductRequest request, @RequestPart(required = false) List<MultipartFile> images){
		Long id = personalProductService.save(user, request, images);
		return ResponseEntity.ok(id);
	}
	// 1-2. 상품 업데이트
	@ApiOperation(value = "상시 상품 수정", notes = "이미지도 여러개 가능(최대 5개) \n" +
		"상품 등록 데이터 요청 데이터:\n request: {\n" +
		"  \"productName\": \"기획전 상품\",\n" +
		"  \"productDesc\": \"기획전 상품이에요오오오\",\n" +
		"  \"startPrice\": 50000,\n" +
		"  \"height\": 5,\n" +
		"  \"width\": 5,\n" +
		"  \"depth\": 5,\n" +
		" \"startTime\": \"2013-09-29T18:46:19Z,\"\n " +
		"  \"categoryId\": 1,\n" +
			" \" brightness\" : 3,\n " +
			" \" saturation\" : 2,\n " +
			" \" temperature\" : 0\n " +
			" \" searchTags \": [1, 2, 7, 9] " +
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
	// 1-4-1. 상품 아이디로 조회
		@ApiOperation(value = "상시 상품 조회(상품 식별자로)", notes = "상품 식별자로 상시 상품 조회")
		@GetMapping()
		public ResponseEntity<?> getAllProductInfoBy(Pageable pageable) throws Exception{
			return ResponseEntity.ok(personalProductService.getProductBy(pageable));
		}

	// 1-4-2. 상품 상세 조회
	@ApiOperation(value = "상시 상품 상세 조회(상품 식별자로)", notes = "로그인한 유저가 이 상품에 서면응찰을 했는지, 했으면 그 가격, 이 상품에 찜을 했는지 여부, 현재 경매 진행중인지 여부 정보들 함께")
	@ApiImplicitParam(name = "productId", value = "상시 상품 식별자")
	@GetMapping("/{productId}")
	public ResponseEntity<PersonalProductCloseDto> getProductInfoClose(@ApiIgnore @LoginUser User user, @PathVariable("productId") Long productId){
		return ResponseEntity.ok(personalProductService.getProductByIdClose(user.getId(), productId));
	}

	@ApiOperation(value = "카테고리별로 상품 리스트 가져오기",  notes = "Pageable로 필요한거 적기 예시 ) http://localhost:8080/personalProduct/list?categoryName=\"\"&page=0&sort=startTime,DESC ")
	@ApiImplicitParam(name = "category", value = "카테고리 이름" , paramType = "query", dataType = "String")
	// 2. 카테고리 별 SLICE로 product가져오기
	//http://localhost:8080/personalProduct/list?categoryName=""&page=0&sort=startTime,DESC
	@GetMapping("/list")
	public ResponseEntity<?> getProductInfoByCategory(@RequestParam("categoryName") String category,  Pageable pageable) throws Exception{
		return ResponseEntity.ok(personalProductService.getProductByCategory(category, pageable));
	}

	@ApiOperation(value = "카테고리별로 진행중인 상품 리스트 가져오기",  notes = "Pageable로 필요한거 적기 예시 ) http://localhost:8080/personalProduct/list?categoryName=\"\"&page=0&sort=startTime,DESC ")
	@ApiImplicitParam(name = "category", value = "카테고리 이름" , paramType = "query", dataType = "String")
	// 3. 카테고리 별 SLICE로 진행중인 product가져오기
	//http://localhost:8080/personalProduct/list/onAir?page=0&size=2&sort=startTime,DESC
	@GetMapping("/list/onAirByCategory")
	public ResponseEntity<?> getProductInfoOnAirByCategory(@RequestParam("categoryName") String category,  Pageable pageable) throws Exception{
		return ResponseEntity.ok(personalProductService.getProductOnAirByCategory(category, pageable));
	}

	@ApiOperation(value= "진행중인 상품 리스트 가져오기")
	@GetMapping("/list/onAir")
	public ResponseEntity<?> getProductInfoOnAir(Pageable pageable) throws Exception{
		return ResponseEntity.ok(personalProductService.getProductOnAir(pageable));
	}

	@ApiOperation(value = "상품 사이즈로 검색한 결과 가져오기",  notes = "Pageable로 필요한거 적기 예시 ) http://localhost:8080/personalProduct/list?categoryName=\"\"&page=0&sort=startTime,DESC ")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "width" , value = "가로", paramType = "path", dataType = "int"),
		@ApiImplicitParam(name = "height", value = "세로", paramType = "path", dataType = "int")})
	// 4. 상품 사이즈별로 조회
	@GetMapping("/size/{width}/{height}")
	public ResponseEntity<?> getProductInfoBySize(@PathVariable("width") Integer width, @PathVariable("height") Integer height, Pageable pageable){
		return ResponseEntity.ok(personalProductService.getProductBySize(width, height, pageable));
	}

	@ApiOperation(value = "상품 사이즈카테고리로로 검색한 결과 가져오기",  notes = "size 종류 = small, medium, large, xlarge" )
	@GetMapping("/sizeCategory/{size}")
	public ResponseEntity<?> getProductBySizeCategory(@PathVariable("size") String size, Pageable pageable){
		return ResponseEntity.ok(personalProductService.getProductBySizeCategory(pageable, size));
	}



	@ApiOperation(value = "모든 searchTag정보 가져오기")
	// 5. 모든 searchTag 조회
	@GetMapping("searchTag")
	public  ResponseEntity<?> getSearchTagsInfo(Pageable pageable){
		return ResponseEntity.ok(personalProductService.getSearchTagsInfo());
	}




}
