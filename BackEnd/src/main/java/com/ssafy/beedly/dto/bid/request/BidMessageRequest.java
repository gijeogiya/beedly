package com.ssafy.beedly.dto.bid.request;

import com.ssafy.beedly.dto.bid.type.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidMessageRequest {

    private MessageType type;
    private Long auctionId;
    private Long productId;
    private Integer bidPrice;

}
