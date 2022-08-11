package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Artist extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Long id;

    @Column(name = "artist_desc", length = 300)
    private String artistDesc;

    @Column(name = "artist_profile_img", length = 200)
    private String artistProfileImg;

    @Column(name = "artist_bg_img", length = 200)
    private String artistBgImg;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "favorite_count")
    private Integer favoriteCount;

    public static Artist createArtist(User user){
        Artist artist = new Artist();
        artist.user = user;
        artist.favoriteCount = 0;
        return artist;
    }

    public void addFavoriteCount() {
        this.favoriteCount += 1;
    }

    public void minusFavoriteCount() {
        this.favoriteCount -= 1;
    }
}
