package com.ssafy.beedly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.beedly.domain.SpecialBoard;
import com.ssafy.beedly.domain.SpecialProduct;

public interface SpecialBoardRepository extends JpaRepository<SpecialBoard, Long> {
	// 스페셜 게시판 시작시간 순으로 정렬
	@Query(value="select b from SpecialBoard b" +
		" join fetch b.specialProduct p join fetch p.category c where c.categoryName = :categoryName order by b.startTime")
	List<SpecialProduct> findSpecialBoardByOrderByStartTimeAsc(String categoryName);

	@Query(value="select b from SpecialBoard b" +
		" join fetch b.specialProduct p join fetch p.category c where c.categoryName = :categoryName order by b.startTime desc")
	List<SpecialProduct> findSpecialBoardByOrderByStartTimeDesc(String categoryName);

}
