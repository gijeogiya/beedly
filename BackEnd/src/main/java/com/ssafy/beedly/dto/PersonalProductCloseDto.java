package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.PersonalFavorite;
import com.ssafy.beedly.domain.SearchTag;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PersonalProductCloseDto {

    @ApiModelProperty(notes = "상시 상품 식별자")
    private Long productId;

    @ApiModelProperty(notes = "태그 이름들")
    private List<String> tagNames;

    @ApiModelProperty(notes = "서면 응찰 가격")
    private Integer absenteeBidPrice;

    @ApiModelProperty(notes = "서면 응찰 여부")
    private Boolean isAbsenteeBid;

    @ApiModelProperty(notes = "상품 찜 여부")
    private Boolean isFavorite;

    public PersonalProductCloseDto(Long productId, List<String> tagNames, Integer absenteeBidPrice,Boolean isAbsenteeBid ,Boolean isFavorite) {
        this.productId = productId;
        this.tagNames = tagNames;
        this.absenteeBidPrice = absenteeBidPrice;
        this.isAbsenteeBid = isAbsenteeBid;
        this.isFavorite = isFavorite;
    }
}
