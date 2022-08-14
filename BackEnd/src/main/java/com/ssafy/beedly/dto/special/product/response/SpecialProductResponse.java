package com.ssafy.beedly.dto.special.product.response;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.SpecialProductImg;
import com.ssafy.beedly.domain.type.SoldStatus;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialProductResponse {

    @ApiModelProperty(notes = "상품 식별자")
    private Long productId;

    @ApiModelProperty(notes = "상품 이름")
    private String productName;

    @ApiModelProperty(notes = "상품 설명")
    private String productDesc;

    @ApiModelProperty(notes = "시작 가격")
    private Integer startPrice;

    private Integer height;
    private Integer weight;
    private Integer depth;

    @ApiModelProperty(notes = "작가 이름")
    private String artistName;

    @ApiModelProperty(notes = "판매 상태: STANDBY, SUCCESS, FAIL")
    private SoldStatus soldStatus;

    @ApiModelProperty(notes = "카테고리 식별자")
    private Long categoryId;

    @ApiModelProperty(notes = "카테고리 이름")
    private String categoryName;

    @ApiModelProperty(notes = "상품 이미지들")
    private List<String> specialProductImgs = new ArrayList<>();

    public SpecialProductResponse(SpecialProduct sp) {
        this.productId = sp.getId();
        this.productName = sp.getProductName();
        this.productDesc = sp.getProductDesc();
        this.startPrice = sp.getStartPrice();
        this.height = sp.getHeight();
        this.weight = sp.getWeight();
        this.depth = sp.getDepth();
        this.artistName = sp.getArtistName();
        this.soldStatus = sp.getSoldStatus();

        this.categoryId = sp.getCategory().getId();
        this.categoryName = sp.getCategory().getCategoryName();

        List<SpecialProductImg> imgs = sp.getSpecialProductImgs();
        for (SpecialProductImg img : imgs) {
            this.specialProductImgs.add(img.getImgUri());
        }
    }
}
