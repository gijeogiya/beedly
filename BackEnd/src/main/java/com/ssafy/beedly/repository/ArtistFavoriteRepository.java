package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.ArtistFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtistFavoriteRepository extends JpaRepository<ArtistFavorite, Long> {

    Optional<ArtistFavorite> findByUserIdAndAndArtistId(Long userId, Long artistId);
}
