package com.ssafy.beedly.repository;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.PersonalSearchTag;
import com.ssafy.beedly.domain.SearchTag;

public interface ProductSearchRepository extends JpaRepository<PersonalProduct, Long> {
	//----------- 1. productName 검색하기
	@Query(value="select c from PersonalProduct c where c.productName like %:productName%")
	Slice<PersonalProduct> findPersonalProductByProductNameLike(@Param("productName") String productName);

	//----------- 2. userNickName 검색하기
	@Query(value="select p from PersonalProduct p join fetch p.user u where u.userNickname like %:userNickname%")
	Slice<PersonalProduct> findPersonalProductByUserNickname(@Param("userNickname") String userNickname);

	//----------- 3. Tag 검색하기
	@Query(value="select s from SearchTag s where s.searchTagName = :tagName")
	SearchTag findPersonalProductByTag(@Param("tagName") String tagName);
	@Query(value="select s from PersonalSearchTag s join fetch s.personalProduct p join fetch p.category where s.searchTag.id = :tagId")
	Slice<PersonalSearchTag> findPersonalSearchTagByTagId(Long tagId);

	//----------- 4. 종료된 작품 검색하기
	@Query(value="select p from PersonalProduct p where  p.artist.id = :id and p.soldStatus = '낙찰'")
	Slice<PersonalProduct> findPersonalProductByTerminated(Long id);

	//----------- 5. product Color로 검색하기(보류)



}
