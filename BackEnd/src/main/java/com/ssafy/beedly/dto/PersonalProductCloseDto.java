package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.PersonalProduct;

public class PersonalProductCloseDto {
    private Long productId;
    private Long tagId;
    private String tagName;
    private Integer absenteeBidPrice;
    private Boolean isFavorite;

    public PersonalProductCloseDto(Long productId, Long tagId,  String tagName, Integer absenteeBidPrice, Boolean isFavorite){
        this.tagId = tagId;
        this.productId = productId;
        this.tagName = tagName;
        this.absenteeBidPrice = absenteeBidPrice;
        this.isFavorite = isFavorite;
    }
}
