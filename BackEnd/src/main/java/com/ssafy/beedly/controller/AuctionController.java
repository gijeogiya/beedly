package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.security.util.JwtUtil;
import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.auction.CreateAuctionResponse;
import com.ssafy.beedly.dto.auction.EnterAuctionResponse;
import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import com.ssafy.beedly.dto.bid.response.BidMessageResponse;
import com.ssafy.beedly.dto.bid.type.MessageType;
import com.ssafy.beedly.service.PersonalAuctionService;
import com.ssafy.beedly.service.PersonalBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
public class AuctionController {

    private final PersonalAuctionService personalAuctionService;
    private final PersonalBidService personalBidService;
    private final SimpMessageSendingOperations messagingTemplate;
    private final JwtUtil jwtUtil;

    // 상시 경매방 생성
    @PostMapping("/auction/personal/product/{productId}")
    public ResponseEntity<CreateAuctionResponse> createPersonalAuction(@ApiIgnore @LoginUser User user, @PathVariable Long productId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateAuctionResponse(personalAuctionService.createPersonalAuction(user, productId)));
    }

    // 상시 경매방 입장(방 정보 + 상품 정보 + 작가정보도 같이 리턴)
    // redis cache 적용해야함.
    @GetMapping("/auction/{auctionId}/personal")
    public ResponseEntity<EnterAuctionResponse> enterPersonalAuction(@ApiIgnore @LoginUser User user, @PathVariable Long auctionId) {
        return ResponseEntity.ok(personalAuctionService.enterPersonalAuction(user, auctionId));
    }

    // 입찰하기
    @MessageMapping("/auction/personal/product/bidding")
    public void productBidding(BidMessageRequest request, @Header(HttpHeaders.AUTHORIZATION) String bearerToken) {
        Long userId = Long.valueOf(jwtUtil.getSubject(bearerToken.substring(7)));

        BidMessageResponse bidMessageResponse = null;

        if (MessageType.ENTER.equals(request.getType())) { // 처음 들어왔을 때, 최신 입찰정보 가져오기
            bidMessageResponse = personalBidService.getLatestBidInfo(request);
        } else if (MessageType.BIDDING.equals(request.getType())) { // 입찰하기
            bidMessageResponse = personalBidService.createBid(userId, request);
        }

        // 입찰정보 뿌리기
        messagingTemplate.convertAndSend("/sub/auction/personal/" + request.getAuctionId(), bidMessageResponse);
    }

}
