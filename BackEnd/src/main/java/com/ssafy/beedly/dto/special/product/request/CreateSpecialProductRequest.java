package com.ssafy.beedly.dto.special.product.request;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.SpecialProductImg;
import com.ssafy.beedly.domain.type.SoldStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateSpecialProductRequest {

    private String productName;
    private String productDesc;
    private Integer startPrice;
    private Integer height;
    private Integer weight;
    private Integer depth;
    private String artistName;
    private Long categoryId;

}
