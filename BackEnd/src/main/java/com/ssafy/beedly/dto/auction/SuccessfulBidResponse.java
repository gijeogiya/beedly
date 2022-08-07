package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.BidType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuccessfulBidResponse {

    private Boolean isSold;
    private BidType bidType;
    private Long soldId;
    private Integer finalPrice;

    private Long productId;
    private String productName;

    private Long userId;
    private String userName;
    private String userNickname;

    public SuccessfulBidResponse(PersonalSold ps) {
        PersonalProduct pp = ps.getPersonalProduct();
        User user = ps.getUser();
        this.isSold = true;
        this.soldId = ps.getId();
        this.finalPrice = ps.getFinalPrice();

        this.productId = pp.getId();
        this.productName = pp.getProductName();

        this.userId = user.getId();
        this.userName = user.getUserName();
        this.userNickname = user.getUserNickname();
    }

    public SuccessfulBidResponse(SpecialSold ss) {
        SpecialProduct sp = ss.getSpecialProduct();
        User user = ss.getUser();
        this.isSold = true;
        this.soldId = ss.getId();
        this.finalPrice = ss.getFinalPrice();

        this.productId = sp.getId();
        this.productName = sp.getProductName();

        this.userId = user.getId();
        this.userName = user.getUserName();
        this.userNickname = user.getUserNickname();
    }
}
