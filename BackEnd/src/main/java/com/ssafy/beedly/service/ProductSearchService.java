package com.ssafy.beedly.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.domain.PersonalAuction;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.PersonalSearchTag;
import com.ssafy.beedly.domain.SearchTag;
import com.ssafy.beedly.dto.PersonalProductDto;
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
	public Slice<PersonalProductDto> getProductByProductName(String productName){
		Slice<PersonalProductDto> dto = productSearchRepository.findPersonalProductByProductNameLike(productName.trim()).map(PersonalProductDto::new);
		return dto;
	}

	@Transactional
	public Slice<PersonalProductDto> getProductByNickname(String userNickName){
		Slice<PersonalProductDto> dto = productSearchRepository.findPersonalProductByUserNickname(userNickName).map(PersonalProductDto::new);
		return dto;
	}

	@Transactional
	public Slice<PersonalProductDto> getProductByTerminated(Long id){
		Slice<PersonalProductDto> dto = productSearchRepository.findPersonalProductByTerminated(id).map(PersonalProductDto::new);
		return dto;
	}

	@Transactional
	public Slice<PersonalProductDto> getProductByTag(String tagName){
		SearchTag searchTag = productSearchRepository.findPersonalProductByTag(tagName.trim());
		Slice<PersonalProductDto> tags =  productSearchRepository.findPersonalSearchTagByTagId(searchTag.getId()).map(PersonalProductDto::new);
		return tags;
	}

}
