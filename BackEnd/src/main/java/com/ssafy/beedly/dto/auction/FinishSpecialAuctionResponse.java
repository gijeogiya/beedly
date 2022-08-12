package com.ssafy.beedly.dto.auction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinishSpecialAuctionResponse {

    public Boolean isFinished;
    public String message;
}
