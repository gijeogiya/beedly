package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.SoldStatus;
import com.ssafy.beedly.dto.auction.EnterSpecialAuctionResponse;
import com.ssafy.beedly.dto.auction.SuccessfulBidResponse;
import com.ssafy.beedly.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.beedly.common.exception.NotFoundException.PRODUCT_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotFoundException.SPECIAL_BOARD_NOT_FOUND;
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
        SpecialAuction saveSpecialAuction = SpecialAuction.createSpecialAuction(findSpecialBoard, user);

        return saveSpecialAuction.getId();
    }

    // 기획전 경매방 입장(상품 정보 리스트)
    public List<EnterSpecialAuctionResponse> enterSpecialAuction(Long auctionId) {
        SpecialAuction specialAuction = specialAuctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundException(SPECIAL_BOARD_NOT_FOUND));
        List<SpecialProduct> specialProducts = specialAuction.getSpecialBoard().getSpecialProducts();

        return specialProducts.stream().map(specialProduct -> new EnterSpecialAuctionResponse(auctionId, specialProduct)).collect(Collectors.toList());
    }

    // 기획전 경매방 종료
    @Transactional
    public void closeSpecialAuction(Long auctionId) {
        SpecialAuction specialAuction = specialAuctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundException(SPECIAL_BOARD_NOT_FOUND));

        specialAuction.closeAuction();
    }

    // 기획전 경매 상품 낙찰 확정
    @Transactional
    public SuccessfulBidResponse successfulBid(Long productId) {
        SpecialProduct findProduct = specialProductRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

        Optional<SpecialBid> bestOnSiteBid = specialBidRepository.findFirstBySpecialProductIdOrderByBidPriceDesc(findProduct.getId());

        SuccessfulBidResponse successfulBidResponse = null;

        if (bestOnSiteBid.isPresent()) {
            SpecialBid bidInfo = bestOnSiteBid.get();
            SpecialSold saveSpecialSold = successfulBidSave(bidInfo);
            successfulBidResponse = new SuccessfulBidResponse(saveSpecialSold);
        } else {
            findProduct.updateSoldStatus(SoldStatus.FAIL);
            successfulBidResponse = new SuccessfulBidResponse();
            successfulBidResponse.setIsSold(false);
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
