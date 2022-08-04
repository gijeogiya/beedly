package com.ssafy.beedly.service;


import java.util.List;
import java.util.Optional;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.dto.ProductAndArtistDto;
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

	@Transactional
	public List<ProductAndArtistDto> find(String categoryName, String orderBy, String sort){
//
//		List<PersonalProduct> =
//		List<Artist> =

		return null;
	}
	
}
