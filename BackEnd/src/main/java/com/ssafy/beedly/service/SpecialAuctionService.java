package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.DuplicateException;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.SoldStatus;
import com.ssafy.beedly.dto.auction.EnterSpecialAuctionResponse;
import com.ssafy.beedly.dto.auction.SpecialAuctionResponse;
import com.ssafy.beedly.dto.auction.SpecialSuccessfulBidResponse;
import com.ssafy.beedly.dto.auction.SuccessfulBidResponse;
import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import com.ssafy.beedly.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.beedly.common.exception.DuplicateException.*;
import static com.ssafy.beedly.common.exception.NotFoundException.*;
import static com.ssafy.beedly.common.exception.NotMatchException.SPECIAL_BOARD_OWNER_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SpecialAuctionService {

    private final SpecialBoardRepository specialBoardRepository;
    private final SpecialAuctionRepository specialAuctionRepository;
    private final SpecialProductRepository specialProductRepository;
    private final SpecialBidRepository specialBidRepository;
    private final SpecialSoldRepository specialSoldRepository;

    // 기획전 경매방 생성
    @Transactional
    public Long createSpecialAuction(User user, Long boardId) {
        SpecialBoard findSpecialBoard = specialBoardRepository.findById(boardId)
                .orElseThrow(() -> new NotFoundException(SPECIAL_BOARD_NOT_FOUND));
        if (findSpecialBoard.getUser().getId() != user.getId()) {
            throw new NotMatchException(SPECIAL_BOARD_OWNER_NOT_MATCH);
        }

        List<SpecialAuction> findAuction = specialAuctionRepository.findBySpecialBoardId(findSpecialBoard.getId());
        if (findAuction.size() >= 1) {
            throw new DuplicateException(SPECIAL_AUCTION_BOARD_DUPLICATED);
        }

        SpecialAuction saveSpecialAuction = SpecialAuction.createSpecialAuction(findSpecialBoard, user);

        return specialAuctionRepository.save(saveSpecialAuction).getId();
    }

    // 기획전 경매방 입장(상품 정보 리스트)
    public EnterSpecialAuctionResponse enterSpecialAuction(Long auctionId) {
        SpecialAuction specialAuction = specialAuctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundException(SPECIAL_BOARD_NOT_FOUND));
//        List<SpecialProduct> specialProducts = specialAuction.getSpecialBoard().getSpecialProducts();
//
//        return specialProducts.stream().map(specialProduct -> new SpecialAuctionResponse(auctionId, specialProduct)).collect(Collectors.toList());

        return new EnterSpecialAuctionResponse(specialAuction);
    }

    // 기획전 경매방 종료
    @Transactional
    public void closeSpecialAuction(Long auctionId, BidMessageRequest request) {
        SpecialAuction specialAuction = specialAuctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundException(SPECIAL_BOARD_NOT_FOUND));

        specialAuction.closeAuction();
    }

    // 기획전 경매 상품 낙찰 확정
    @Transactional
    public SpecialSuccessfulBidResponse successfulBid(BidMessageRequest request) {
        SpecialProduct findProduct = specialProductRepository.findById(request.getProductId())
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));
        List<SpecialSold> findSoldInfo = specialSoldRepository.findBySpecialProductId(request.getProductId());
        if (findSoldInfo.size() >= 1) {
            throw new DuplicateException(PRODUCT_SOLD_DUPLICATED);
        }

        Optional<SpecialBid> bestOnSiteBid = specialBidRepository.findFirstBySpecialProductIdOrderByBidPriceDesc(findProduct.getId());

        SpecialSuccessfulBidResponse successfulBidResponse = null;

        // 현재 진행중인 상품 인덱스 증가
        SpecialAuction findAuction = specialAuctionRepository.findById(request.getAuctionId())
                .orElseThrow(() -> new NotFoundException(AUCTION_NOT_FOUND));
        findAuction.addCurSProdIdx();

        if (bestOnSiteBid.isPresent()) {
            SpecialBid bidInfo = bestOnSiteBid.get();
            SpecialSold saveSpecialSold = successfulBidSave(bidInfo);
            successfulBidResponse = new SpecialSuccessfulBidResponse(saveSpecialSold, findAuction.getCurSProdIdx());
        } else {
            findProduct.updateSoldStatus(SoldStatus.FAIL);
            successfulBidResponse = new SpecialSuccessfulBidResponse();
            successfulBidResponse.setIsSold(false);
            successfulBidResponse.setNextSProdIdx(findAuction.getCurSProdIdx());
        }

        return successfulBidResponse;
    }

    // 낙찰 처리 메소드
    public SpecialSold successfulBidSave(SpecialBid bidInfo) {
        SpecialSold save = specialSoldRepository.save(SpecialSold.createSpecialSold(bidInfo));
        bidInfo.getSpecialProduct().updateSoldStatus(SoldStatus.SUCCESS);

        return save;
    }
}
