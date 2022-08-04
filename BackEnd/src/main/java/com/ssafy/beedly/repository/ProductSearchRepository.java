package com.ssafy.beedly.repository;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.beedly.domain.PersonalProduct;

public interface ProductSearchRepository extends JpaRepository<PersonalProduct, Long> {
	//----------- 1. productName 검색하기
	@Query(value="select c from PersonalProduct c where c.productName like %:productName%")
	Slice<PersonalProduct> findPersonalProductByProductNameLike(@Param("productName") String productName);

	//----------- 2. userNickName 검색하기

	//----------- 3. Tag 검색하기

	//----------- 2. 종료된 작품 검색하기
	//----------- 2. product Color로 검색하기
	//----------- 2. product Color로 검색하기(보류)



}
