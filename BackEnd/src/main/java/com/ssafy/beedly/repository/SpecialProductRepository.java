package com.ssafy.beedly.repository;

import java.util.List;

import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.type.YN;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SpecialProductRepository extends JpaRepository<SpecialProduct, Long> {
	// 1. 프로덕트이름으로 상품 찾기 - 리스트
	@Query(value="select c from SpecialProduct c where c.productName like %:productName%")
	List<SpecialProduct> findSpecialProductByProductNameLike(@Param("productName") String productName);

	@Modifying
	@Query("update SpecialProduct sp set sp.isDeleted = :yn where sp.specialBoard.id = :boardId")
	int softDeleteProductByProductId(Long boardId, YN yn);
}
