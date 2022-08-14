package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.BidType;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuccessfulBidResponse {

    @ApiModelProperty(notes = "낙찰됐으면 true, 유찰됐으면 false")
    private Boolean isSold;

    @ApiModelProperty(notes = "현장응찰로 낙찰: ONSITE, 서면응찰로 낙찰: ABSENTEE")
    private BidType bidType;

    @ApiModelProperty(notes = "낙찰 식별자")
    private Long soldId;

    @ApiModelProperty(notes = "낙찰된 가격")
    private Integer finalPrice;

    @ApiModelProperty(notes = "낙찰된 상품 식별자")
    private Long productId;

    @ApiModelProperty(notes = "낙찰된 상품 이름")
    private String productName;

    @ApiModelProperty(notes = "낙찰된 유저 식별자")
    private Long userId;

    @ApiModelProperty(notes = "낙찰된 유저 이름")
    private String userName;

    @ApiModelProperty(notes = "낙찰된 유저 닉네임")
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
