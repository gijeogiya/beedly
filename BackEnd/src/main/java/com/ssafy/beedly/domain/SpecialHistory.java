package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.Action;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "SPECIAL_HISTORY")
public class SpecialHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_history_id")
    private Long id;

    @Column(name = "s_action_status")
    private Action action;

    @Column(name = "s_user_id")
    private Long userId;

    @Column(name = "s_auction_id")
    private Long auctionId;
}
