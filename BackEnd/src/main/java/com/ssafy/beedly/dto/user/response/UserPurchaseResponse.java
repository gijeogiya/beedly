package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.AuctionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserPurchaseResponse {

    private Long soldId;
    private AuctionType auctionType;
    private Integer finalPrice;
    private Boolean paidFlag;

    private Long productId;
    private String productName;
    List<String> productImgDtos = new ArrayList<>();

    public UserPurchaseResponse(PersonalSold personalSold) {
        this.soldId = personalSold.getId();
        this.auctionType = AuctionType.P;
        this.finalPrice = personalSold.getFinalPrice();
        this.paidFlag = personalSold.getPaidFlag();

        PersonalProduct p = personalSold.getPersonalProduct();
        this.productId = p.getId();
        this.productName = p.getProductName();
        for (PersonalProductImg productImg : p.getProductImgs()) {
            this.productImgDtos.add(productImg.getImgUri());
        }
    }

    public UserPurchaseResponse(SpecialSold specialSold) {
        this.soldId = specialSold.getId();
        this.auctionType = AuctionType.S;
        this.finalPrice = specialSold.getFinalPrice();
        this.paidFlag = specialSold.getPaidFlag();

        SpecialProduct s = specialSold.getSpecialProduct();
        this.productId = s.getId();
        this.productName = s.getProductName();
        for (SpecialProductImg productImg : s.getSpecialProductImgs()) {
            this.productImgDtos.add(productImg.getImgUri());
        }
    }
}
