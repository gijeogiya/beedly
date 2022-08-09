package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.ArtistDto;
import com.ssafy.beedly.service.ArtistService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
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

    @ApiOperation(value = "모든 아티스트 정보가져오기", notes = "아티스트 정보를 모두 가져옵니다.")
    @GetMapping
    public ResponseEntity<?> getArtistInfo(Pageable pageable){
        return ResponseEntity.ok(artistService.getArtistsInfo(pageable));
    }

    @ApiOperation(value = "특정 아티스트 정보 가져오기", notes = "artistId에 해당하는 작가의 정보를 가져옵니다.")
    @ApiImplicitParam(name = "artistId", value = "작가아이디", paramType = "path", dataType = "Long")
    @GetMapping("/{artistId}")
    public ResponseEntity<Optional<ArtistDto>> getArtistInfo(@PathVariable Long artistId){
        return ResponseEntity.ok(artistService.getArtistInfoClose(artistId));
    }
}
