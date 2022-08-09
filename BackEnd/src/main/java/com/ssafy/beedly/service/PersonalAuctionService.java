package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.DuplicateException;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.BidType;
import com.ssafy.beedly.domain.type.SoldStatus;
import com.ssafy.beedly.dto.auction.EnterPersonalAuctionResponse;
import com.ssafy.beedly.dto.auction.SuccessfulBidResponse;
import com.ssafy.beedly.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ssafy.beedly.common.exception.DuplicateException.PERSONAL_AUCTION_PRODUCT_DUPLICATED;
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
    private final PersonalBidRepository personalBidRepository;
    private final AbsenteeBidRepository absenteeBidRepository;
    private final PersonalSoldRepository personalSoldRepository;


    // 상시 경매방 생성
    @Transactional
    public Long createPersonalAuction(User user, Long productId) {
        PersonalProduct findProduct = personalProductRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));
        if (findProduct.getUser().getId() != user.getId()) {
            throw new NotMatchException(PRODUCT_OWNER_NOT_MATCH);
        }

        List<PersonalAuction> findAuction = personalAuctionRepository.findByPersonalProductId(findProduct.getId());
        if (findAuction.size() >= 1) {
            throw new DuplicateException(PERSONAL_AUCTION_PRODUCT_DUPLICATED);
        }

        PersonalAuction savePersonalAuction = personalAuctionRepository.save(PersonalAuction.createPersonalAuction(findProduct, user));

        return savePersonalAuction.getId();
    }

    // 상시 경매방 입장(상품 정보 + 작가정보도 같이 리턴)
    public EnterPersonalAuctionResponse enterPersonalAuction(Long auctionId) {
        PersonalAuction findPersonalAuction = personalAuctionRepository.findByIdWithProductAndUser(auctionId)
                .orElseThrow(() -> new NotFoundException(AUCTION_NOT_FOUND));

        User host = findPersonalAuction.getUser();
        Artist findArtist = artistRepository.findArtistByUserId(host.getId())
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

    // 상시 경매 낙찰 확정
    @Transactional
    public SuccessfulBidResponse successfulBid(Long productId) {
        PersonalProduct findProduct = personalProductRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

        Optional<PersonalBid> bestOnSiteBid = personalBidRepository.findFirstByPersonalProductIdOrderByBidPriceDesc(findProduct.getId());
        Optional<AbsenteeBid> bestAbsenteeBid = absenteeBidRepository.findFirstByPersonalProductIdOrderByAbsenteeBidPriceDesc(findProduct.getId());

        SuccessfulBidResponse successfulBidResponse = null;

        // 현장응찰, 서면응찰 둘다 있을 때
        if (bestOnSiteBid.isPresent() && bestAbsenteeBid.isPresent()) {
            PersonalBid onSiteBidInfo = bestOnSiteBid.get();
            AbsenteeBid absenteeBidInfo = bestAbsenteeBid.get();

            Integer bestOnSitePrice = onSiteBidInfo.getBidPrice();
            Integer bestAbsenteeBidPrice = absenteeBidInfo.getAbsenteeBidPrice();

            if (bestAbsenteeBidPrice >= bestOnSitePrice) { // 서면응찰가 >= 현장응찰가 (서면응찰자가 현장응찰가격으로 낙찰, 같은 가격이어도 서면응찰자가 우선권)
                PersonalSold savePersonalSold = successfulBidSave(bestOnSitePrice, findProduct, bestAbsenteeBid.get().getUser());
                successfulBidResponse = new SuccessfulBidResponse(savePersonalSold);
                successfulBidResponse.setBidType(BidType.ABSENTEE);
            }  else { // 서면응찰가 < 현장응찰가
                PersonalSold savePersonalSold = successfulBidSave(bestOnSitePrice, findProduct, bestOnSiteBid.get().getUser());
                successfulBidResponse = new SuccessfulBidResponse(savePersonalSold);
                successfulBidResponse.setBidType(BidType.ONSITE);
            }
        } else if (bestOnSiteBid.isPresent()) { // 현장응찰만 있을때
            PersonalBid bidInfo = bestOnSiteBid.get();
            //낙찰처리
            PersonalSold savePersonalSold = successfulBidSave(bidInfo.getBidPrice(), findProduct, bidInfo.getUser());
            successfulBidResponse = new SuccessfulBidResponse(savePersonalSold);
            successfulBidResponse.setBidType(BidType.ONSITE);
        } else if (bestAbsenteeBid.isPresent()) { // 서면응찰만 있을때
            AbsenteeBid bidInfo = bestAbsenteeBid.get();
            // 낙찰 처리
            PersonalSold savePersonalSold = successfulBidSave(bidInfo.getAbsenteeBidPrice(), findProduct, bidInfo.getUser());
            successfulBidResponse = new SuccessfulBidResponse(savePersonalSold);
            successfulBidResponse.setBidType(BidType.ABSENTEE);
        } else { // 둘다 없을때 (유찰 처리)
            findProduct.updateSoldStatus(SoldStatus.FAIL);
            successfulBidResponse = new SuccessfulBidResponse();
            successfulBidResponse.setIsSold(false);
        }

        return successfulBidResponse;
    }

    // 낙찰 처리 메소드
    public PersonalSold successfulBidSave(Integer finalPrice, PersonalProduct p, User u) {
        PersonalSold save = personalSoldRepository.save(PersonalSold.createPersonalSold(finalPrice, p, u));
        p.updateSoldStatus(SoldStatus.SUCCESS);

        return save;
    }
}
