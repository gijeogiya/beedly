package com.ssafy.beedly.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.domain.PersonalProduct;

import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.repository.SpecialProductRepository;
import com.ssafy.beedly.repository.query.SpecialProductQueryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SpecialProductService {
	private final SpecialProductRepository specialProductRepository;
	private final SpecialProductQueryRepository specialProductQueryRepository;

	// 상품 등록
	@Transactional
	public void save(SpecialProduct specialProduct){
		specialProductRepository.save(specialProduct);
	}

	// 상품 수정
	@Transactional
	public void update(SpecialProduct specialProduct){
		Optional<SpecialProduct> product = specialProductRepository.findById(specialProduct.getId());

		product.ifPresent(selectProduct ->{
			specialProductRepository.save(selectProduct);
		});
	}

	// 상품 삭제
	@Transactional
	public void delete(SpecialProduct specialProduct){
		specialProductRepository.deleteById(specialProduct.getId());
	}



}
