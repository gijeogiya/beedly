package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialProduct;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterSpecialAuctionResponse {

    @ApiModelProperty(notes = "기획전 경매방 식별자")
    private Long auctionId;

    @ApiModelProperty(notes = "상품 식별자")
    private Long productId;

    @ApiModelProperty(notes = "상품 이름")
    private String productName;

    @ApiModelProperty(notes = "상품 설명")
    private String productDesc;

    @ApiModelProperty(notes = "시작 가격")
    private Integer startPrice;

    @ApiModelProperty(notes = "작가 이름")
    private String artistName;

    public EnterSpecialAuctionResponse(Long auctionId, SpecialProduct sp) {
        this.auctionId = auctionId;
        this.productId = sp.getId();
        this.productName = sp.getProductName();
        this.productDesc = sp.getProductDesc();
        this.startPrice = sp.getStartPrice();
        this.artistName = sp.getArtistName();
    }
}
