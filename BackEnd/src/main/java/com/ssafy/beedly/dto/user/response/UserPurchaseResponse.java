package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserPurchaseResponse {

    private Long personalSoldId;
    private int finalPrice;
    private boolean paidFlag;

    private Long productId;
    private String productName;
    List<String> productImgDtos = new ArrayList<>();

    public UserPurchaseResponse(PersonalSold personalSold) {
        this.personalSoldId = personalSold.getId();
        this.finalPrice = personalSold.getFinalPrice();
        this.paidFlag = personalSold.isPaidFlag();

        PersonalProduct p = personalSold.getPersonalProduct();
        this.productId = p.getId();
        this.productName = p.getProductName();
        for (PersonalProductImg productImg : p.getProductImgs()) {
            this.productImgDtos.add(productImg.getImgUri());
        }
    }

    public UserPurchaseResponse(SpecialSold specialSold) {
        this.personalSoldId = specialSold.getId();
        this.finalPrice = specialSold.getFinalPrice();
        this.paidFlag = specialSold.isPaidFlag();

        SpecialProduct s = specialSold.getSpecialProduct();
        this.productId = s.getId();
        this.productName = s.getProductName();
        for (SpecialProductImg productImg : s.getSpecialProductImgs()) {
            this.productImgDtos.add(productImg.getImgUri());
        }
    }
}
