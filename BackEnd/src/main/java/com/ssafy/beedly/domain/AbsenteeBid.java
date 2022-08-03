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
@Table(name = "ABSENTEE_BID")
public class AbsenteeBid extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "absentee_bid_id")
    private Long id;

    @Column(name = "absentee_bid_price")
    private Integer absenteeBidPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_product_id")
    private PersonalProduct personalProduct;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public static AbsenteeBid createAbsenteeBid(Integer price, PersonalProduct p, User user) {
        AbsenteeBid absenteeBid = new AbsenteeBid();
        absenteeBid.absenteeBidPrice = price;
        absenteeBid.personalProduct = p;
        absenteeBid.user = user;
        return absenteeBid;
    }

    public void updateBidPrice(Integer newPrice) {
        this.absenteeBidPrice = newPrice;
    }
}
