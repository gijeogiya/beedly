package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.SpecialBid;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.bid.request.BidMessageRequest;
import com.ssafy.beedly.dto.bid.response.BidMessageResponse;
import com.ssafy.beedly.repository.SpecialBidRepository;
import com.ssafy.beedly.repository.SpecialProductRepository;
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
public class SpecialBidService {

    private final UserRepository userRepository;
    private final SpecialBidRepository specialBidRepository;
    private final SpecialProductRepository specialProductRepository;

    // 방에 첫 입장 후, 최신 입찰정보 가져오기
    public BidMessageResponse getLatestBidInfo(BidMessageRequest request) {
        Optional<SpecialBid> findLatestBidInfo = specialBidRepository.findFirstBySpecialProductIdOrderByBidPriceDesc(request.getProductId());
        BidMessageResponse bidResponse = null;
        if (findLatestBidInfo.isPresent()) {
            bidResponse = new BidMessageResponse(findLatestBidInfo.get());
        }

        return bidResponse;
    }

    @Transactional
    public BidMessageResponse createBid(Long userId, BidMessageRequest request) {
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        SpecialProduct findProduct = specialProductRepository.findById(request.getProductId())
                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

        SpecialBid specialBid = SpecialBid.createSpecialBid(findUser, findProduct, request);
        specialBidRepository.save(specialBid);

        return new BidMessageResponse(specialBid);
    }
}
