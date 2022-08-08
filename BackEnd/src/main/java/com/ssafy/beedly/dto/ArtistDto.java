package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistDto {

    private Long id;
    private String artistDesc;
    private String artistProfileImg;
    private String artistBgImg;
    private Long userId;

    private String userNickname;

    public ArtistDto(Artist artist) {
        this.id = artist.getId();
        this.artistDesc = artist.getArtistDesc();
        this.artistProfileImg = artist.getArtistProfileImg();
        this.artistBgImg = artist.getArtistBgImg();
        this.userId = artist.getUser().getId();
        this.userNickname = artist.getUser().getUserNickname();
    }
}
