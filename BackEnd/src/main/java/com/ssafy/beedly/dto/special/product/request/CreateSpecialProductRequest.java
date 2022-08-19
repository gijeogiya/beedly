package com.ssafy.beedly.dto.special.product.request;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.SpecialProductImg;
import com.ssafy.beedly.domain.type.SoldStatus;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateSpecialProductRequest {

    @ApiModelProperty(notes = "상품 이름")
    private String productName;

    @ApiModelProperty(notes = "상품 설명")
    private String productDesc;

    @ApiModelProperty(notes = "시작 가격")
    private Integer startPrice;

    @ApiModelProperty(notes = "세로")
    private Integer height;

    @ApiModelProperty(notes = "가로")
    private Integer weight;

    @ApiModelProperty(notes = "높이")
    private Integer depth;

    @ApiModelProperty(notes = "작가 이름")
    private String artistName;

    @ApiModelProperty(notes = "카테고리 식별자")
    private Long categoryId;

}
