package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.PersonalProductImg;
import com.ssafy.beedly.domain.PersonalSold;
import com.ssafy.beedly.domain.type.SoldStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSalesResponse {

    private Long productId;
    private String productName;
    private SoldStatus soldStatus;
    private LocalDateTime startTime;
    private List<String> productImgDtos = new ArrayList<>();

    private Long personalSoldId;
    private Integer finalPrice;
    private LocalDateTime endTime;

    public UserSalesResponse(PersonalProduct p) {
        this.productId = p.getId();
        this.productName = p.getProductName();
        this.soldStatus = p.getSoldStatus();
        this.startTime = p.getStartTime();
        for (PersonalProductImg productImg : p.getProductImgs()) {
            this.productImgDtos.add(productImg.getImgUri());
        }

        PersonalSold personalSold = p.getPersonalSold();
        if(personalSold != null) {
            this.personalSoldId = personalSold.getId();
            this.finalPrice = personalSold.getFinalPrice();
            this.endTime = personalSold.getEndTime();
        }
    }


}
