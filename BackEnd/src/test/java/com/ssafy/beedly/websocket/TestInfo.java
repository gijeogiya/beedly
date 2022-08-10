package com.ssafy.beedly.websocket;

import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import com.ssafy.beedly.dto.bid.response.BidMessageResponse;
import com.ssafy.beedly.dto.bid.type.MessageType;

public class TestInfo {

    public static final BidMessageResponse TEST_BID_MESSAGE_RESPONSE= new BidMessageResponse("박재권", "박박박", 55000);
    public static final BidMessageRequest TEST_ENTER_BID_MESSAGE_REQUEST = new BidMessageRequest("E", 1L, 1L, 55000);
    public static final BidMessageRequest TEST_BIDDING_BID_MESSAGE_REQUEST = new BidMessageRequest("B", 1L, 1L, 55000);
    public static final String TEST_AUTHORIZATION = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjYwMTA3OTc1LCJleHAiOjE2NjAxOTQzNzV9.dESecBt8K6RrhikhYM2HkHtmxCBvPLSTGKZcNzAQ5vI";
}
