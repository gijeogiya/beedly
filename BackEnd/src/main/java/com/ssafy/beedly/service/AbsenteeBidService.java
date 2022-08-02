package com.ssafy.beedly.service;

import com.ssafy.beedly.repository.AbsenteeBidRepository;
import com.ssafy.beedly.repository.query.AbsenteeBidQueryRepository;
import com.ssafy.beedly.domain.AbsenteeBid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AbsenteeBidService {

    private final AbsenteeBidRepository absenteeBidRepository;

    // 서면응찰 등록
    @Transactional
    public void save(AbsenteeBid absenteeBid) {
        absenteeBidRepository.save(absenteeBid);
    }

    // 서면응찰 수정
    @Transactional
    public void update(AbsenteeBid absenteeBid) {
        Optional<AbsenteeBid> bid = absenteeBidRepository.findById(absenteeBid.getId());

        bid.ifPresent(selectBid -> {
            absenteeBidRepository.save(selectBid);
        });
    }

    @Transactional
    // 서면응찰 삭제
    public void delete(AbsenteeBid absenteeBid) {
        absenteeBidRepository.deleteById(absenteeBid.getId());
    }

    // 서면응찰 목록
}
