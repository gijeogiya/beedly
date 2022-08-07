package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.PersonalAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PersonalAuctionRepository extends JpaRepository<PersonalAuction, Long> {

    @Query("select pa from PersonalAuction pa join fetch pa.personalProduct join fetch pa.user where pa.id = :personalAuctionId and pa.activeFlag = true")
    Optional<PersonalAuction> findByIdWithProductAndUser(Long personalAuctionId);

}
