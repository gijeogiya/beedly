package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonalProductRepository extends JpaRepository<PersonalProduct, Long> {

    // 1. 특정 단어가 들어가는 상품 찾기 - 리스트
    @Query("select p from PersonalProduct p where p.productName like :productName")
    List<PersonalProduct> findPersonalProductByProductNameLike(String productName);

}
