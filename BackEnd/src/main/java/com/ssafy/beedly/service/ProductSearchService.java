package com.ssafy.beedly.service;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.repository.ProductSearchRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductSearchService {
	private final ProductSearchRepository productSearchRepository;

	@Transactional
	public Slice<PersonalProduct> getProductByName(String name){
		return productSearchRepository.findPersonalProductByProductNameLike(name);
	}


}
