package com.ssafy.beedly.dto.personal.product.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePersonalProductRequest {

    private String productName;
    private String productDesc;
    private Integer startPrice;
    private Integer height;
    private Integer weight;
    private Integer depth;
    // YYYY-MM-DDTHH:mm:sszz
    private LocalDateTime startTime;
    private Long categoryId;

    private Integer brightness;
    private Integer saturation;
    private Integer temperature;

}
