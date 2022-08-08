package com.ssafy.beedly.dto.personal.product.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePersonalProductRequest {

    @ApiModelProperty(notes = "상품 이름")
    private String productName;

    @ApiModelProperty(notes = "상품 설명")
    private String productDesc;

    @ApiModelProperty(notes = "경매 시작 가격")
    private Integer startPrice;

    @ApiModelProperty(notes = "세로")
    private Integer height;

    @ApiModelProperty(notes = "가로")
    private Integer width;

    @ApiModelProperty(notes = "높이")
    private Integer depth;

    // YYYY-MM-DDTHH:mm:sszz
    @ApiModelProperty(notes = "YYYY-MM-DDTHH:mm:sszz")
    private LocalDateTime startTime;

    @ApiModelProperty(notes = "카테고리 식별자")
    private Long categoryId;

    @ApiModelProperty(notes = "밝기")
    private Integer brightness;

    @ApiModelProperty(notes = "채도")
    private Integer saturation;

    @ApiModelProperty(notes = "온도")
    private Integer temperature;

}
