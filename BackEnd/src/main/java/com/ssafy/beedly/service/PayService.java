package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.PersonalSold;
import com.ssafy.beedly.domain.SpecialSold;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.repository.PersonalSoldRepository;
import com.ssafy.beedly.repository.SpecialSoldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.beedly.common.exception.NotFoundException.SOLD_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotMatchException.SOLD_NOT_MATCH;

@Service
@RequiredArgsConstructor
public class PayService {

    private final PersonalSoldRepository personalSoldRepository;
    private final SpecialSoldRepository specialSoldRepository;

    @Transactional
    public void payPersonalSold(User user, Long soldId) {
        PersonalSold findSold = personalSoldRepository.findById(soldId)
                .orElseThrow(() -> new NotFoundException(SOLD_NOT_FOUND));
        if (user.getId() != findSold.getUser().getId()) {
            throw new NotMatchException(SOLD_NOT_MATCH);
        }

        findSold.updatePaidFlag();
    }

    @Transactional
    public void paySpecialSold(User user, Long soldId) {
        SpecialSold findSold = specialSoldRepository.findById(soldId)
                .orElseThrow(() -> new NotFoundException(SOLD_NOT_FOUND));
        if (user.getId() != findSold.getUser().getId()) {
            throw new NotMatchException(SOLD_NOT_MATCH);
        }

        findSold.updatePaidFlag();
    }
}
