package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.dto.auction.EnterPersonalAuctionResponse;
import com.ssafy.beedly.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.beedly.common.exception.NotFoundException.*;
import static com.ssafy.beedly.common.exception.NotMatchException.AUCTION_NOT_MATCH;
import static com.ssafy.beedly.common.exception.NotMatchException.PRODUCT_OWNER_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonalAuctionService {

    private final PersonalAuctionRepository personalAuctionRepository;
    private final PersonalProductRepository personalProductRepository;

    private final ArtistRepository artistRepository;


    // 상시 경매방 생성
    @Transactional
    public Long createPersonalAuction(User user, Long productId) {
        PersonalProduct findProduct = personalProductRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));
        if (findProduct.getUser().getId() != user.getId()) {
            throw new NotMatchException(PRODUCT_OWNER_NOT_MATCH);
        }
        PersonalAuction savePersonalAuction = personalAuctionRepository.save(PersonalAuction.createPersonalAuction(findProduct, user));

        return savePersonalAuction.getId();
    }

    // 상시 경매방 입장(상품 정보 + 작가정보도 같이 리턴)
    public EnterPersonalAuctionResponse enterPersonalAuction(Long auctionId) {
        PersonalAuction findPersonalAuction = personalAuctionRepository.findByIdWithProductAndUser(auctionId)
                .orElseThrow(() -> new NotFoundException(AUCTION_NOT_FOUND));

        User host = findPersonalAuction.getUser();
        Artist findArtist = artistRepository.findByUserId(host.getId())
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));

        return new EnterPersonalAuctionResponse(findPersonalAuction, findArtist, host);
    }

    // 상시 경매방 종료
    @Transactional
    public void closePersonalAuction(User user, Long auctionId) {
        PersonalAuction findPersonalAuction = personalAuctionRepository.findByIdWithProductAndUser(auctionId)
                .orElseThrow(() -> new NotFoundException(AUCTION_NOT_FOUND));
        if (findPersonalAuction.getUser().getId() != user.getId()) {
            throw new NotMatchException(AUCTION_NOT_MATCH);
        }

        findPersonalAuction.closeAuction();
    }
}
