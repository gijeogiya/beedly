package com.ssafy.beedly.dto.special.product.response;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.SpecialProductImg;
import com.ssafy.beedly.domain.type.SoldStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialProductResponse {

    private Long productId;
    private String productName;
    private String productDesc;
    private Integer startPrice;
    private Integer height;
    private Integer weight;
    private Integer depth;
    private String artistName;
    private SoldStatus soldStatus;

    private Long categoryId;
    private String categoryName;

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
