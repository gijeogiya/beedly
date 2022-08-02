package com.ssafy.beedly.dto.auction;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAuctionResponse {

    @ApiModelProperty(value = "상시 경매 식별자", example = "상시 경매 식별자(1)")
    private Long auctionId;
}
