package com.ssafy.beedly.dto.bid.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AbsenteeBidPriceRequest {

    @ApiModelProperty(notes = "희망 서면 응찰 가격")
    private Integer absenteeBidPrice;

}
