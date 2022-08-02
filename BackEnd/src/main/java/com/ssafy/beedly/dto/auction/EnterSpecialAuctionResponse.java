package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialProduct;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterSpecialAuctionResponse implements Serializable {

    @ApiModelProperty(example = "기획전 경매방 식별자(1)")
    private Long auctionId;

    @ApiModelProperty(example = "상품 식별자(1)")
    private Long productId;

    @ApiModelProperty(example = "상품 이름(폭풍의 눈물)")
    private String productName;

    @ApiModelProperty(example = "상품 설명(이 그림은 폭풍의 눈물입니다.)")
    private String productDesc;

    @ApiModelProperty(example = "시작 가격(500000)")
    private Integer startPrice;

    @ApiModelProperty(example = "작가 이름(무느스크)")
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
