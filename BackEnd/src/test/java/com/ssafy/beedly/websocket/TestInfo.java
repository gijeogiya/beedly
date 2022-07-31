package com.ssafy.beedly.websocket;

import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import com.ssafy.beedly.dto.bid.response.BidMessageResponse;
import com.ssafy.beedly.dto.bid.type.MessageType;

public class TestInfo {

    public static final BidMessageResponse TEST_BID_MESSAGE_RESPONSE= new BidMessageResponse("박재권", "박박박", 55000);
    public static final BidMessageRequest TEST_ENTER_BID_MESSAGE_REQUEST = new BidMessageRequest(MessageType.ENTER, 1L, 1L, 55000);
    public static final BidMessageRequest TEST_BIDDING_BID_MESSAGE_REQUEST = new BidMessageRequest(MessageType.BIDDING, 1L, 1L, 55000);
    public static final String TEST_AUTHORIZATION = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjU5MTQ4NDM4LCJleHAiOjE2NTkyMzQ4Mzh9.fU0_II0bUfIqbpbglYnyFMV3Y8038ysklnpXP15awmk";
}
