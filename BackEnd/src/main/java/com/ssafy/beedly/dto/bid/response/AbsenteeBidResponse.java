package com.ssafy.beedly.dto.bid.response;

import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbsenteeBidResponse {

    @ApiModelProperty(notes = "서면 응찰 식별자")
    private Long absenteeBidId;

    @ApiModelProperty(notes = "서면 응찰 가격")
    private Integer absenteeBidPrice;

    @ApiModelProperty(notes = "서면 응찰한 시간")
    private LocalDateTime createdDate;

    @ApiModelProperty(notes = "상품 식별자")
    private Long productId;

    @ApiModelProperty(notes = "상품 이름")
    private String productName;

    @ApiModelProperty(notes = "등록한 작가 식별자")
    private Long artistId;
    @ApiModelProperty(notes = "등록한 작가 닉네임")
    private String artistNickname;

    public AbsenteeBidResponse(AbsenteeBid ab) {
        this.absenteeBidId = ab.getId();
        this.absenteeBidPrice = ab.getAbsenteeBidPrice();
        this.createdDate = ab.getCreatedDate();

        PersonalProduct personalProduct = ab.getPersonalProduct();
        this.productId = personalProduct.getId();
        this.productName = personalProduct.getProductName();

        this.artistId = personalProduct.getArtist().getId();
        this.artistNickname = personalProduct.getUser().getUserNickname();
    }

}
