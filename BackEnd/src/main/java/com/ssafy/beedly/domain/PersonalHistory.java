package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.Action;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "PERSONAL_HISTORY")
public class PersonalHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_history_id")
    private Long id;

    @Column(name = "p_action_status")
    private Action action;

    @Column(name = "p_user_id")
    private Long userId;

    @Column(name = "p_auction_id")
    private Long auctionId;
}
