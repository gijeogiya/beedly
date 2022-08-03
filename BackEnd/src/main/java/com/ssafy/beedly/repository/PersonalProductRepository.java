package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonalProductRepository extends JpaRepository<PersonalProduct, Long>{

    //----------- 1. productName 검색하기
    @Query(value="select c from PersonalProduct c where c.productName like %:productName%")
    List<PersonalProduct> findPersonalProductByProductNameLike(@Param("productName") String productName);

    //----------- 2. 카테고리 정렬
    //----------- 2-1 시간 오름차순
    @Query(value="select p from PersonalProduct p join fetch p.category c where c.categoryName = :categoryName order by p.startTime")
    List<PersonalProduct> findPersonalProductByOrderByStartTime(@Param("categoryName")String categoryName);

    //----------- 2-2 시간 내림차순 DEFALUT
    @Query(value="select p from PersonalProduct p join fetch p.category c where c.categoryName = :categoryName order by p.startTime desc ")
    List<PersonalProduct> findPersonalProductByOrderByStartTimeDesc(@Param("categoryName")String categoryName);

    //---------- 2-3 찜하기 오름차순
    @Query(value="select p from PersonalProduct p join fetch p.category c where c.categoryName = :categoryName order by p.favoriteCount")
    List<PersonalProduct> findPersonalProductByOrderByFavoriteCount(@Param("categoryName")String categoryName);

    //---------- 2-4 찜하기 내림차순
    @Query(value="select p from PersonalProduct p join fetch p.category c where c.categoryName = :categoryName order by p.favoriteCount desc ")
    List<PersonalProduct> findPersonalProductByOrderByFavoriteCountDesc(@Param("categoryName")String categoryName);

    //---------- 3. 현재 시작 중인 경매 카테고리 정렬
    //---------- 3-1 시간 오름차순
    @Query( value="select pa from PersonalAuction pa join fetch pa.personalProduct p"
            +" join fetch p.category c"+" where c.categoryName = : categoryName and  pa.activeFlag = true order by p.startTime")
    List<PersonalProduct> findPersonalProductByOnAirOderByStartTime(@Param("categoryName")String categoryName);

    //---------- 3-2 시간 내림차순
    @Query( value="select pa from PersonalAuction pa join fetch pa.personalProduct p"
            +" join fetch p.category c"+" where c.categoryName = : categoryName and  pa.activeFlag = true order by p.startTime Desc")
    List<PersonalProduct> findPersonalProductByOnAirOderByStartTimeDesc(@Param("categoryName")String categoryName);

    //---------- 3-3 찜하기 오름차순
    @Query( value="select pa from PersonalAuction pa join fetch pa.personalProduct p"
        +" join fetch p.category c"+" where c.categoryName = : categoryName and  pa.activeFlag = true order by p.favoriteCount Desc")
    List<PersonalProduct> findPersonalProductByOnAirOderByFavoriteCount(@Param("categoryName")String categoryName);

    //---------- 3-4 찜하기 내림차순
    @Query( value="select pa from PersonalAuction pa join fetch pa.personalProduct p"
        +" join fetch p.category c"+" where c.categoryName = : categoryName and  pa.activeFlag = true order by p.favoriteCount Desc")
    List<PersonalProduct> findPersonalProductByOnAirOderByFavoriteCountDesc(@Param("categoryName")String categoryName);

}
