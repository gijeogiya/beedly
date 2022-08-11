package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.ArtistFavorite;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.ArtistDto;
import com.ssafy.beedly.repository.ArtistFavoriteRepository;
import com.ssafy.beedly.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.beedly.common.exception.NotFoundException.ARTIST_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistService {

    private final ArtistRepository artistRepository;
    private final ArtistFavoriteRepository artistFavoriteRepository;

    @Transactional
    public Slice<ArtistDto> getArtistsInfo(Pageable pageable){
        Slice<ArtistDto> artistDtos = artistRepository.findAll(pageable).map(ArtistDto::new);
        return artistDtos;
    }

    @Transactional
    public ArtistDto getArtistInfoClose(User user, Long artistId){
        Artist findArtist = artistRepository.findById(artistId)
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        Optional<ArtistFavorite> findFavoriteInfo = artistFavoriteRepository.findByUserIdAndAndArtistId(user.getId(), artistId);

        return new ArtistDto(findArtist, findFavoriteInfo);
    }
}
