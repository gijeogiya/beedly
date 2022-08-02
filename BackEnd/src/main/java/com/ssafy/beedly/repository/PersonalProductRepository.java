package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonalProductRepository extends JpaRepository<PersonalProduct, Long>{

    @Query(value="select c from PersonalProduct c where c.productName like %:productName%")
    List<PersonalProduct> findPersonalProductByProductNameLike(@Param("productName") String productName);

    // 2. 카테고리 별 조회 시작시간 순으로 정렬
    @Query(value="select p from PersonalProduct p join fetch p.category c where c.categoryName = :categoryName order by p.startTime")
    List<PersonalProduct> findPersonalProductByOrderByStartTimeAsc(@Param("categoryName")String categoryName);

    @Query(value="select p from PersonalProduct p join fetch p.category c where c.categoryName = :categoryName order by p.startTime desc ")
    List<PersonalProduct> findPersonalProductByOrderByStartTimeDesc(@Param("categoryName")String categoryName);

    // 3. 현재 시작 중인 경매 카테고리 별로 가져오기(오름차순)
    @Query( value="select pa from PersonalAuction pa join fetch pa.personalProduct p"
            +" join fetch p.category c"+" where c.categoryName = : categoryName and  pa.activeFlag = true order by p.startTime")
    List<PersonalProduct> findPersonalProductByOnAirOderByStartTimeAsc(@Param("categoryName")String categoryName);

    // 4. 현재 시작 중인 경매 카테고리 별로 가져오기(내림차순)
    @Query( value="select pa from PersonalAuction pa join fetch pa.personalProduct p"
            +" join fetch p.category c"+" where c.categoryName = : categoryName and  pa.activeFlag = true order by p.startTime Desc")
    List<PersonalProduct> findPersonalProductByOnAirOderByStartTimeDesc(@Param("categoryName")String categoryName);
}
