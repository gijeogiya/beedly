package com.ssafy.beedly.dto.auction;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAuctionResponse {

    @ApiModelProperty(notes = "상시 경매 식별자")
    private Long auctionId;
}
