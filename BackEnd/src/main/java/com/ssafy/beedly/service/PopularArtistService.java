package com.ssafy.beedly.service;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.dto.ArtistUserDto;
import com.ssafy.beedly.dto.PopularArtistDto;
import com.ssafy.beedly.repository.ArtistRepository;
import com.ssafy.beedly.repository.PopularArtistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PopularArtistService {

    private final PopularArtistRepository popularArtistRepository;
    private final ArtistRepository artistRepository;

    public List<ArtistUserDto> getPopularArtist() {
        List<PopularArtistDto>  popularArtists = popularArtistRepository.getPopularArtist();
        List<ArtistUserDto> popularArtistList = new ArrayList<>();
        for (PopularArtistDto artist: popularArtists
             ) {
            Long id = artist.getArtistId();
            Artist findArtist = artistRepository.findById(id).get();
            popularArtistList.add(new ArtistUserDto(findArtist));
        }
        return popularArtistList;
    }
}
