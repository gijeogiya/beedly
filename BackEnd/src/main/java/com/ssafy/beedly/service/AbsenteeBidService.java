package com.ssafy.beedly.service;

import com.ssafy.beedly.repository.AbsenteeBidRepository;
import com.ssafy.beedly.repository.query.AbsenteeBidQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AbsenteeBidService {

    private final AbsenteeBidRepository absenteeBidRepository;
    private final AbsenteeBidQueryRepository absenteeBidQueryRepository;

    // 사전응찰 등록
    @Transactional
    public void save
}
