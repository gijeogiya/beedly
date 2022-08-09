package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PersonalAuctionRepository extends JpaRepository<PersonalAuction, Long> {

    @Query("select pa from PersonalAuction pa join fetch pa.personalProduct join fetch pa.user where pa.id = :personalAuctionId and pa.activeFlag = true")
    Optional<PersonalAuction> findByIdWithProductAndUser(Long personalAuctionId);

    // 상품 조회할때 이 상품이 경매 진행중인지 아닌지 조회
    @Query("select pa from PersonalAuction pa where pa.personalProduct.id = :productId and pa.activeFlag = true")
    Optional<PersonalAuction> findByProductId(Long productId);

}
