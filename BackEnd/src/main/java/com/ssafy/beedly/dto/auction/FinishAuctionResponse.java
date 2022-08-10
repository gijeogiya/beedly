package com.ssafy.beedly.dto.auction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinishAuctionResponse {

    private String message;
    private boolean isFinished;

}
