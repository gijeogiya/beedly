package com.ssafy.beedly.repository;

import java.util.List;

import com.ssafy.beedly.domain.SpecialAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.beedly.domain.SpecialBoard;
import com.ssafy.beedly.domain.SpecialProduct;

public interface SpecialBoardRepository extends JpaRepository<SpecialBoard, Long> {
	// 1. 기획게시판 시작시간 순으로 정렬 (오름차순)
	@Query(value="select b from SpecialBoard b" +
		" join fetch b.specialProducts p join fetch p.category c where c.categoryName = :categoryName order by b.startTime")
	List<SpecialProduct> findSpecialBoardByOrderByStartTimeAsc(String categoryName);
	// 2. 기획게시판 시작시간 순으로 정렬 (내림차순)
	@Query(value="select b from SpecialBoard b" +
		" join fetch b.specialProducts p join fetch p.category c where c.categoryName = :categoryName order by b.startTime desc")
	List<SpecialProduct> findSpecialBoardByOrderByStartTimeDesc(String categoryName);

	// 3. 기획게시판 onAir 시작시간 순으로 정렬(오름차순)
	@Query(value="select sa from SpecialAuction sa join fetch sa.specialBoard b where sa.activeFlag = true order by b.startTime")
	List<SpecialAuction> findSpecialBoardByoOnAirOrderByStartTimeAsc();

	// 4. 기획게시판 onAir 시작시간 순으로 정렬(내림차순)
	@Query(value="select sa from SpecialAuction sa join fetch sa.specialBoard b  where sa.activeFlag = true order by b.startTime DESC")
	List<SpecialAuction> findSpecialBoardByOnAirOrderByStartTimeDesc();
}
