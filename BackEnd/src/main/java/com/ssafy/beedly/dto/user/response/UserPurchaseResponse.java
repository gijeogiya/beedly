package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.AuctionType;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserPurchaseResponse {

    @ApiModelProperty(notes = "낙찰(구매) 식별자")
    private Long soldId;

    @ApiModelProperty(notes = "경매 타입: P(상시), S(기획전)")
    private AuctionType auctionType;

    @ApiModelProperty(notes = "낙찰 가격")
    private Integer finalPrice;

    @ApiModelProperty(notes = "결제 여부")
    private Boolean paidFlag;

    @ApiModelProperty(notes = "상품 식별자")
    private Long productId;

    @ApiModelProperty(notes = "상품 이름")
    private String productName;

    @ApiModelProperty(notes = "상품 이미지들")
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
