package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.ArtistDto;
import com.ssafy.beedly.dto.artist.ArtistDescRequest;
import com.ssafy.beedly.service.ArtistFavoriteService;
import com.ssafy.beedly.service.ArtistService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Optional;

@RequestMapping("artist")
@RestController
@RequiredArgsConstructor
@Api("예술가 정보 컨트롤러")
public class ArtistController {

    private final ArtistService artistService;
    private final ArtistFavoriteService artistFavoriteService;

    @ApiOperation(value = "모든 아티스트 정보가져오기", notes = "아티스트 정보를 모두 가져옵니다.")
    @GetMapping
    public ResponseEntity<?> getArtistInfo(Pageable pageable){
        return ResponseEntity.ok(artistService.getArtistsInfo(pageable));
    }

    @ApiOperation(value = "특정 아티스트 정보 가져오기", notes = "artistId에 해당하는 작가의 정보를 가져옵니다.")
    @ApiImplicitParam(name = "artistId", value = "작가아이디", paramType = "path", dataType = "Long")
    @GetMapping("/{artistId}")
    public ResponseEntity<ArtistDto> getArtistInfo(@ApiIgnore @LoginUser User user, @PathVariable Long artistId){
        return ResponseEntity.ok(artistService.getArtistInfoClose(user, artistId));
    }

    @ApiOperation(notes = "아티스트 찜 하기", value = "아티스트 식별자로 찜하기")
    @ApiImplicitParam(name = "artistId", value = "작가 식별자")
    @PostMapping("/favorite/artist/{artistId}")
    public ResponseEntity<Long> createArtistFavorite(@ApiIgnore @LoginUser User user, @PathVariable Long artistId) {
        return ResponseEntity.ok(artistFavoriteService.createArtistFavorite(user, artistId));
    }

    @ApiOperation(notes = "작가 찜 취소하기", value = "작가 찜 식별자로 찜 취소하기")
    @DeleteMapping("/favorite/{favoriteId}")
    public ResponseEntity deleteArtistFavorite(@ApiIgnore @LoginUser User user, @PathVariable Long favoriteId) {
        artistFavoriteService.deleteArtistFavorite(user, favoriteId);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(notes = "작가 설명 수정하기", value = "로그인 유저가 작가일 때 작가 설명 수정하기")
    @PatchMapping("/info/desc")
    public ResponseEntity updateArtistDesc(@ApiIgnore @LoginUser User user, @RequestBody ArtistDescRequest artistDescRequest) {
        artistService.updateArtistDesc(user, artistDescRequest);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(notes = "작가 프로필 이미지 수정하기", value = "로그인 유저가 작가일 때 프로필 이미지 수정하기")
    @PatchMapping("/info/profile")
    public ResponseEntity updateProfileImg(@ApiIgnore @LoginUser User user, @RequestParam MultipartFile image) {
        artistService.updateProfileImg(user, image);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(notes = "작가 배경 이미지 수정하기", value = "로그인 유저가 작가일 때 배경 이미지 수정하기")
    @PatchMapping("/info/background")
    public ResponseEntity updateBackGroundImg(@ApiIgnore @LoginUser User user, @RequestParam MultipartFile image) {
        artistService.updateBackGroundImg(user, image);

        return ResponseEntity.ok().build();
    }
}
