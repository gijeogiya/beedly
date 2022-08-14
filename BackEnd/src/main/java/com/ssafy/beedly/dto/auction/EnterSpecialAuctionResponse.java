package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.SpecialProductImg;
import com.ssafy.beedly.dto.category.CategoryDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterSpecialAuctionResponse implements Serializable {

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

    @ApiModelProperty(notes = "상품 이미지들")
    private List<String> productImages = new ArrayList<>();

    private CategoryDto categoryDto;

    public EnterSpecialAuctionResponse(Long auctionId, SpecialProduct sp) {
        this.auctionId = auctionId;
        this.productId = sp.getId();
        this.productName = sp.getProductName();
        this.productDesc = sp.getProductDesc();
        this.startPrice = sp.getStartPrice();
        this.artistName = sp.getArtistName();
        List<SpecialProductImg> images = sp.getSpecialProductImgs();
        for (SpecialProductImg image : images) {
            this.productImages.add(image.getImgUri());
        }
        this.categoryDto = new CategoryDto(sp.getCategory());
    }
}
