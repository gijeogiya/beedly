package com.ssafy.beedly.dto.bid.response;

import com.ssafy.beedly.domain.PersonalBid;
import com.ssafy.beedly.domain.SpecialBid;
import com.ssafy.beedly.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidMessageResponse {

    private String userName;
    private String userNickname;
    private Integer bidPrice;
    private Boolean isSold;

    public BidMessageResponse(PersonalBid pb) {
        User bidder = pb.getUser();
        this.userName = bidder.getUserName();
        this.userNickname = bidder.getUserNickname();
        this.bidPrice = pb.getBidPrice();
    }

    public BidMessageResponse(SpecialBid sb) {
        User bidder = sb.getUser();
        this.userName = bidder.getUserName();
        this.userNickname = bidder.getUserNickname();
        this.bidPrice = sb.getBidPrice();
    }
}
