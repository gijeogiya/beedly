package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.DuplicateException;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.ArtistFavorite;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.artist.ArtistSimpleDto;
import com.ssafy.beedly.repository.ArtistFavoriteRepository;
import com.ssafy.beedly.repository.ArtistRepository;
import com.ssafy.beedly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.beedly.common.exception.DuplicateException.ARTIST_FAVORITE_DUPLICATED;
import static com.ssafy.beedly.common.exception.NotFoundException.*;
import static com.ssafy.beedly.common.exception.NotMatchException.FAVORITE_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistFavoriteService {

    private final ArtistFavoriteRepository artistFavoriteRepository;
    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long createArtistFavorite(User user, Long artistId) {
        Artist findArtist = artistRepository.findById(artistId)
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        User findUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Optional<ArtistFavorite> findFavorite
                = artistFavoriteRepository.findByUserIdAndAndArtistId(findUser.getId(), findArtist.getId());

        if (findFavorite.isPresent()) {
            throw new DuplicateException(ARTIST_FAVORITE_DUPLICATED);
        }
        findArtist.addFavoriteCount();

        return artistFavoriteRepository.save(ArtistFavorite.createArtistFavorite(findUser, findArtist)).getId();
    }

    @Transactional
    public void deleteArtistFavorite(User user, Long favoriteId) {
        ArtistFavorite findFavorite = artistFavoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new NotFoundException(ARTIST_FAVORITE_NOT_FOUND));
        if (user.getId() != findFavorite.getUser().getId()) {
            throw new NotMatchException(FAVORITE_NOT_MATCH);
        }
        findFavorite.getArtist().minusFavoriteCount();

        artistFavoriteRepository.delete(findFavorite);
    }

    // 내가 찜한 작가 리스트
    public List<ArtistSimpleDto> findMyArtistList(User user) {
        List<ArtistFavorite> findMyFavorite = artistFavoriteRepository.findMyFavoriteArtist(user.getId());

        return findMyFavorite.stream().map(artistFavorite -> new ArtistSimpleDto(artistFavorite.getArtist())).collect(Collectors.toList());
    }
}
