package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.AbsenteeBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AbsenteeBidRepository extends JpaRepository<AbsenteeBid, Long> {

<<<<<<< HEAD
    // 서면응찰 등록
//    @Query(value="insert into ABSENTEE_BID (absentee_bid_id, absentee_bid_price, p_product_id, user_id) values (absentee_bid_id, absentee_bid_price, p_product_id, user_id)")

    // 서면응찰 수정


    // 서면응찰 삭제


    // 서면응찰 목록
=======
>>>>>>> 6526eaf36b75a27a7860070b6e4654d0bb158761
}
