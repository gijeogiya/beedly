package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.PersonalBid;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import com.ssafy.beedly.dto.bid.response.BidMessageResponse;
import com.ssafy.beedly.repository.PersonalBidRepository;
import com.ssafy.beedly.repository.PersonalProductRepository;
import com.ssafy.beedly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.beedly.common.exception.NotFoundException.PRODUCT_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PersonalBidService {

    private final UserRepository userRepository;
    private final PersonalBidRepository personalBidRepository;
    private final PersonalProductRepository personalProductRepository;

    // 방에 첫 입장 후, 최신 입찰정보 가져오기
    public BidMessageResponse getLatestBidInfo(BidMessageRequest request) {
        Optional<PersonalBid> findLatestBidInfo = personalBidRepository.findFirstByPersonalProductIdOrderByBidPriceDesc(request.getProductId());
        BidMessageResponse bidResponse = new BidMessageResponse();
        if (findLatestBidInfo.isPresent()) {
            bidResponse = new BidMessageResponse(findLatestBidInfo.get());
        }

        return bidResponse;
    }

    // 입찰하기
    @Transactional
    public BidMessageResponse createBid(Long userId, BidMessageRequest request) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        PersonalProduct findProduct = personalProductRepository.findById(request.getProductId())
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

        PersonalBid personalBid = PersonalBid.createPersonalBid(findUser, findProduct, request);
        personalBidRepository.save(personalBid);

        return new BidMessageResponse(personalBid);
    }


}
