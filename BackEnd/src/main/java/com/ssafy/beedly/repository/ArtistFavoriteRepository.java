package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.ArtistFavorite;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArtistFavoriteRepository extends JpaRepository<ArtistFavorite, Long> {

    Optional<ArtistFavorite> findByUserIdAndAndArtistId(Long userId, Long artistId);

    @Query("select af from ArtistFavorite af join fetch af.artist where af.user.id = :userId")
    List<ArtistFavorite> findMyFavoriteArtist(Long userId);
}
