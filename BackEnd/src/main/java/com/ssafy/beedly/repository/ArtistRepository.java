package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.PersonalProduct;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    @Query("select a from Artist a where a.user.userNickname like %:id%")
    Optional<Artist> findByUserId(Long id);

    // userId로 작가 조회
    Optional<Artist> findArtistByUserId(Long userId);

    // 작가의 진행중인 작품"
    @Query("select p from PersonalProduct p where p.artist.id = :userId and p.soldStatus='SUCCESS'")
    Slice<PersonalProduct> findEndProductByArtistId(Long userId);

    @Query("select p from PersonalProduct p where p.artist.id = :userId and p.soldStatus='STANDBY'")
    Slice<PersonalProduct> findStandByProductByArtistId(Long userId);

}
