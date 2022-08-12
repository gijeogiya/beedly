package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.ArtistFavorite;
import com.ssafy.beedly.domain.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistDto {

    @ApiModelProperty(notes = "작가 식별자")
    private Long artistId;

    @ApiModelProperty(notes = "작가 설명")
    private String artistDesc;

    @ApiModelProperty(notes = "작가 프로필이미지")
    private String artistProfileImg;

    @ApiModelProperty(notes = "작가 배경이미지")
    private String artistBgImg;

    @ApiModelProperty(notes = "작가의 유저 식별자")
    private Long userId;

    @ApiModelProperty(notes = "작가 이름")
    private String userNickname;

    @ApiModelProperty(notes = "로그인한 유저가 이 작가를 찜했는지(true) 안했는지(false)")
    private Boolean isMyFavorite = false;

    @ApiModelProperty(notes = "작가 찜 식별자(찜했으면 식별자, 찜 안했으면 null)")
    private Long favoriteId;

    @ApiModelProperty(notes = "이 작가를 좋아요 한 수")
    private Integer favoriteCount;

    public ArtistDto(Artist artist) {
        this.artistId = artist.getId();
        this.artistDesc = artist.getArtistDesc();
        this.artistProfileImg = artist.getArtistProfileImg();
        this.artistBgImg = artist.getArtistBgImg();
        this.userId = artist.getUser().getId();
        this.userNickname = artist.getUser().getUserNickname();
        this.favoriteCount = artist.getFavoriteCount();
    }

    public ArtistDto(Artist artist, Optional<ArtistFavorite> favorite) {
        this.artistId = artist.getId();
        this.artistDesc = artist.getArtistDesc();
        this.artistProfileImg = artist.getArtistProfileImg();
        this.artistBgImg = artist.getArtistBgImg();
        this.userId = artist.getUser().getId();
        this.userNickname = artist.getUser().getUserNickname();
        this.favoriteCount = artist.getFavoriteCount();
        if (favorite.isPresent()) {
            this.isMyFavorite = true;
            this.favoriteId = favorite.get().getId();
        }
    }
}
