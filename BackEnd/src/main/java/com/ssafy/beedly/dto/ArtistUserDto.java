package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.Artist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistUserDto {
    private Long artistId;
    private String artistProfileImg;
    private String userNickname;
    private String artistBgImg;
    private String userName;

    public ArtistUserDto(Artist artist) {
        this.artistId = artist.getId();
        this.artistProfileImg = artist.getArtistProfileImg();
        this.userNickname = artist.getUser().getUserNickname();
        this.artistBgImg = artist.getArtistBgImg();
        this.userName = artist.getUser().getUserName();
    }
}
