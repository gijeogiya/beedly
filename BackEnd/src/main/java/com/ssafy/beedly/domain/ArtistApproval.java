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
@Table(name = "ARTIST_APPROVAL")
public class ArtistApproval extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_approval_id")
    private Long id;

    @Column(name = "artist_approval_flag", columnDefinition = "TINYINT", length = 1)
    private Boolean approvalFlag;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static ArtistApproval createArtistApproval(Boolean approvalFlag, User user) {
        ArtistApproval artistApproval = new ArtistApproval();
        artistApproval.user = user;
        artistApproval.approvalFlag = approvalFlag;
        return artistApproval;
    }
}
