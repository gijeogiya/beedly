package com.ssafy.beedly.service;

import com.ssafy.beedly.dto.ArtistDto;
import com.ssafy.beedly.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistService {

    private final ArtistRepository artistRepository;
    @Transactional
    public Slice<ArtistDto> getArtistsInfo(Pageable pageable){
        Slice<ArtistDto> artistDtos = artistRepository.findAll(pageable).map(ArtistDto::new);
        return artistDtos;
    }

    @Transactional
    public Optional<ArtistDto> getArtistInfoClose(Long id){
        return artistRepository.findById(id).map(ArtistDto::new);
    }
}
