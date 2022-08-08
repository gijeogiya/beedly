package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.ArtistDto;
import com.ssafy.beedly.service.ArtistService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("artist")
@RestController
@RequiredArgsConstructor
@Api("예술가 정보 컨트롤러")
public class ArtistController {

    private final ArtistService artistService;
    @GetMapping
    public ResponseEntity<?> getArtistInfo(Pageable pageable){
        return ResponseEntity.ok(artistService.getArtistsInfo(pageable));
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<Optional<ArtistDto>> getArtistInfo(@PathVariable Long artistId){
        return ResponseEntity.ok(artistService.getArtistInfoClose(artistId));
    }
}
