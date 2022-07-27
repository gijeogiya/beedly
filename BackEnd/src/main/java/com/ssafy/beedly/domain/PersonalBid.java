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
@Table(name = "PERSONAL_BID")
public class PersonalBid extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_bid_id")
    private Long id;

    @Column(name = "p_bid_price")
    private Integer bidPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_product_id")
    private PersonalProduct personalProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User user;


}
