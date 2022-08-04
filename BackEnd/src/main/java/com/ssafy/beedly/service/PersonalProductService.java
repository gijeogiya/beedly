package com.ssafy.beedly.service;


import java.util.List;
import java.util.Optional;


import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.dto.ProductAndArtistDto;
import com.ssafy.beedly.dto.PersonalProductCloseDto;
import com.ssafy.beedly.dto.PersonalProductDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.repository.PersonalProductRepository;
import com.ssafy.beedly.repository.query.PersonalProductQueryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PersonalProductService {

	private final PersonalProductRepository personalProductRepository;
	private final PersonalProductQueryRepository personalProductQueryRepository;

	// 상품 등록
	@Transactional
	public void save(PersonalProduct personalProduct){
		personalProductRepository.save(personalProduct);
	}

	// 상품 수정
	@Transactional
	public void update(PersonalProduct personalProduct){
		Optional<PersonalProduct> product = personalProductRepository.findById(personalProduct.getId());

		product.ifPresent(selectProduct ->{
			personalProductRepository.save(selectProduct);
		});
	}

	/// 상품 삭제
	@Transactional
	public void delete(SpecialProduct specialProduct){
		personalProductRepository.deleteById(specialProduct.getId());
	}

	// 상품 삭제
	@Transactional
	public void delete(PersonalProduct personalProduct){
		personalProductRepository.deleteById(personalProduct.getId());
	}
	// 상품 정보가져오기
	@Transactional
	public PersonalProductDto getProductById(Long id){
		PersonalProduct product = personalProductRepository.findById(id).get();
		PersonalProductDto dto = new PersonalProductDto(product);
		System.out.println("여기까지못옴");
		return dto;

	}

	// @Transactional
	// public PersonalProductCloseDto getProductByIdClose(Long id){
	// 	PersonalProductCloseDto dto = new PersonalProductCloseDto();
	// 	return dto
	// }

	@Transactional
	public Slice<PersonalProductDto> getProductByCategory(String categoryName, Pageable pageable){
		Slice<PersonalProductDto> products = personalProductRepository.findProductByCategory(categoryName, pageable)
				.map(PersonalProductDto::new);
		return products;
	}

//	@Transactional
	public Slice<PersonalProductDto> getProductOnAirByCategory(String categoryName, Pageable pageable){
		Slice<PersonalProductDto> products = personalProductRepository.findProductOnAirByCategory(categoryName, pageable)
				.map(PersonalProductDto::new);
		return products;
	}


	@Transactional
	public Slice<PersonalProductDto> getProductBySize(Integer width, Integer height, Pageable pageable){
		Slice<PersonalProductDto> products = personalProductRepository.findProductBySize(width, height, pageable)
				.map(PersonalProductDto::new);
		return products;
	}

}
