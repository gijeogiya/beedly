package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

    @Query("select a from Artist a where a.user.id = :userId")
    Optional<Artist> findByUserId(Long userId);
}
