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
@Table(name = "SPECIAL_AUCTION")
public class SpecialAuction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "s_active_flag")
    private Boolean activeFlag;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_board_id")
    private SpecialBoard specialBoard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static SpecialAuction createSpecialAuction(SpecialBoard sb, User u) {
        SpecialAuction specialAuction = new SpecialAuction();
        specialAuction.activeFlag = true;
        specialAuction.specialBoard = sb;
        specialAuction.user = u;
        return specialAuction;
    }

    public void closeAuction() {
        this.activeFlag = false;
    }
}
