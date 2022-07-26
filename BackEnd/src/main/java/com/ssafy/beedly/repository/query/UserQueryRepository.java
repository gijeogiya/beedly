package com.ssafy.beedly.repository.query;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.dto.user.response.UserPurchaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.beedly.domain.QPersonalProduct.personalProduct;
import static com.ssafy.beedly.domain.QPersonalSold.*;
import static com.ssafy.beedly.domain.QSpecialProduct.*;
import static com.ssafy.beedly.domain.QSpecialSold.*;
import static com.ssafy.beedly.domain.QUser.*;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<User> findAll(){
        return queryFactory
                .selectFrom(user)
//                .where(
//                        user.userPw.eq(""),
//                        user.userEmail.eq("")
//                )
                .fetch();
    }

    // 상시 경매 구매내역 리스트 조회
    public List<UserPurchaseResponse> searchUserPersonalPurchaces(Long userId) {
        return queryFactory
                .select(Projections.constructor(UserPurchaseResponse.class, personalSold))
                .from(personalSold)
                .where(personalSold.user.id.eq(userId))
                .join(personalSold.personalProduct, personalProduct).fetchJoin()
                .orderBy(personalSold.createdDate.desc())
                .fetch();
    }

    // 기획전 구매내역 리스트 조회
    public List<UserPurchaseResponse> searchUserSpecialPurchaces(Long userId) {
        return queryFactory
                .select(Projections.constructor(UserPurchaseResponse.class, specialSold))
                .from(specialSold)
                .where(specialSold.user.id.eq(userId))
                .join(specialSold.specialProduct, specialProduct).fetchJoin()
                .orderBy(specialSold.createdDate.desc())
                .fetch();
    }
}
