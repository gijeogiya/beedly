package com.ssafy.beedly.service;


import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.AbsenteeBidDto;
import com.ssafy.beedly.repository.AbsenteeBidRepository;
import com.ssafy.beedly.repository.PersonalProductRepository;

import com.ssafy.beedly.repository.AbsenteeBidRepository;
import com.ssafy.beedly.repository.query.AbsenteeBidQueryRepository;
import com.ssafy.beedly.domain.AbsenteeBid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ssafy.beedly.common.exception.NotFoundException.ABSENTEE_BID_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotFoundException.PRODUCT_NOT_FOUND;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AbsenteeBidService {


    private final AbsenteeBidRepository absenteeBidRepository;
    private final PersonalProductRepository personalProductRepository;

    // 서면응찰 등록
    @Transactional
    public void save(User user, Integer price, Long productId) {
        //        List<AbsenteeBid> list = getlist();
        //        for (AbsenteeBid a:list) {
        //            if (a.getUser().getId().equals(absenteeBid.getUser().getId()) && a.getPersonalProduct().getId().equals(absenteeBid.getPersonalProduct().getId())) {
        //                return; // 이미 해당 유저가 해당 상품에 대한 서면응찰을 한 기록이 있음
        //            }
        //        }
        PersonalProduct personalProduct = personalProductRepository.findById(productId)
            .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));
        AbsenteeBid bid = AbsenteeBid.createAbsenteeBid(price, personalProduct, user);
        absenteeBidRepository.save(bid);
    }

    // 서면응찰 수정
    @Transactional
    public void update(Long absenteeBidId, Integer newPrice) {
        AbsenteeBid findAbsenteeBid = absenteeBidRepository.findById(absenteeBidId)
                .orElseThrow(() -> new NotFoundException(ABSENTEE_BID_NOT_FOUND));
        findAbsenteeBid.updateBidPrice(newPrice);}


    @Transactional
    // 서면응찰 삭제
    public void delete(Long absenteeBidId) {
        AbsenteeBid absenteeBid = absenteeBidRepository.findById(absenteeBidId)
                .orElseThrow(() -> new NotFoundException(ABSENTEE_BID_NOT_FOUND));
        absenteeBidRepository.delete(absenteeBid);
    }
}
