package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.AbsenteeBid;
import com.ssafy.beedly.domain.PersonalFavorite;
import com.ssafy.beedly.domain.SearchTag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PersonalProductCloseDto {
    private Long productId;
    private List<String> tagNames;
    private Integer absenteeBidPrice;
    private Boolean isAbsenteeBid;
    private Boolean isFavorite;

    public PersonalProductCloseDto(Long productId, List<String> tagNames, Integer absenteeBidPrice,Boolean isAbsenteeBid ,Boolean isFavorite) {
        this.productId = productId;
        this.tagNames = tagNames;
        this.absenteeBidPrice = absenteeBidPrice;
        this.isAbsenteeBid = isAbsenteeBid;
        this.isFavorite = isFavorite;
    }
}
