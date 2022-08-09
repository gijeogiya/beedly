package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.SpecialAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SpecialAuctionRepository extends JpaRepository<SpecialAuction, Long> {

    // 현재 진행중인 기획전 경매 조회
    @Query("select sa from SpecialAuction sa join fetch sa.specialBoard where sa.activeFlag = true ")
    List<SpecialAuction> findOnAirList();

}
