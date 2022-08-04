package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.PersonalProduct;

public class PersonalProductCloseDto {
    private Long tagId;
    private Long ProductId;
    private String tagName;
    private Integer absenteeBidPrice;
    private Boolean isFavorite;

    public PersonalProductCloseDto(PersonalProduct product){
        
    }
}
