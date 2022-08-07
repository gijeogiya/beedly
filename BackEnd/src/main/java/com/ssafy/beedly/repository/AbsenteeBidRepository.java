package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.AbsenteeBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AbsenteeBidRepository extends JpaRepository<AbsenteeBid, Long> {
    // 서면응찰 등록
//    @Query(value="insert into ABSENTEE_BID (absentee_bid_id, absentee_bid_price, p_product_id, user_id) values (absentee_bid_id, absentee_bid_price, p_product_id, user_id)")

    // 서면응찰 수정


    // 서면응찰 삭제


    // 서면응찰 목록

    // 낙찰 확정할 때, 상품의 최고 서면응찰 정보 가져오기
    Optional<AbsenteeBid> findFirstByPersonalProductIdOrderByAbsenteeBidPriceDesc(Long productId);
}
