package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialBoard;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.auction.EnterSpecialAuctionResponse;
import com.ssafy.beedly.repository.SpecialAuctionRepository;
import com.ssafy.beedly.repository.SpecialBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.beedly.common.exception.NotFoundException.SPECIAL_BOARD_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotMatchException.SPECIAL_BOARD_OWNER_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SpecialAuctionService {

    private final SpecialBoardRepository specialBoardRepository;
    private final SpecialAuctionRepository specialAuctionRepository;

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
}
