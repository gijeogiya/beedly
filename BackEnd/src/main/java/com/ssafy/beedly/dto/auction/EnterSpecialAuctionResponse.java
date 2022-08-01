package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterSpecialAuctionResponse {

    private Long auctionId;

    private Long productId;
    private String productName;
    private String productDesc;
    private Integer startPrice;
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
