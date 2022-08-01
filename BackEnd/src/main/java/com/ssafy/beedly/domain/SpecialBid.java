package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "SPECIAL_BID")
public class SpecialBid extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_bid_id")
    private Long id;

    @Column(name = "s_bid_price")
    private Integer bidPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_product_id")
    private SpecialProduct specialProduct;

    public static SpecialBid createSpecialBid(User u, SpecialProduct p, BidMessageRequest request) {
        SpecialBid specialBid = new SpecialBid();
        specialBid.bidPrice = request.getBidPrice();
        specialBid.specialProduct = p;
        specialBid.user = u;
        return specialBid;
    }
}

