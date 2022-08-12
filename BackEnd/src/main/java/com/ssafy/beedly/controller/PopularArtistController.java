package com.ssafy.beedly.controller;

import com.ssafy.beedly.service.PopularArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("popularArtist")
@RequiredArgsConstructor
public class PopularArtistController {

    private final PopularArtistService popularArtistService;

    @GetMapping
    public ResponseEntity<?> getPopularArtists() {
        return ResponseEntity.ok(popularArtistService.getPopularArtist());
    }

}
