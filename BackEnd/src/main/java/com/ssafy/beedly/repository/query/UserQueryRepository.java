package com.ssafy.beedly.repository.query;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.dto.user.response.UserPurchaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.beedly.domain.QPersonalProduct.personalProduct;
import static com.ssafy.beedly.domain.QPersonalProductImg.*;
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

    // 판매내역 리스트 조회
//    public List<UserSalesResponse> searchUserSales(Long userId) {
        public List<PersonalProduct> searchUserSales(Long userId) {

            return queryFactory
//                .select(Projections.constructor(UserSalesResponse.class, personalProduct))
                .select(personalProduct)
                .from(personalProduct)
                .where(personalProduct.user.id.eq(userId))
                .leftJoin(personalProduct.personalSold, personalSold).fetchJoin()
                .leftJoin(personalProduct.productImgs, personalProductImg).fetchJoin()
                .orderBy(personalProduct.createdDate.desc())
                .fetch();
    }

    // 상시구매내역 결제정보 조회
    public PersonalSold searchPersonalPurchasePaidInfo(Long productSoldId) {
        return queryFactory
                .selectFrom(personalSold)
                .where(personalSold.id.eq(productSoldId))
                .leftJoin(personalSold.user, user).fetchJoin()
                .leftJoin(personalSold.personalProduct, personalProduct).fetchJoin()
//                .join(personalSold.personalProduct.productImgs, personalProductImg).fetchJoin()
                .fetchOne();
    }

    // 기획전구매내역 결제정보 조회
    public SpecialSold searchSpecialPurchasePaidInfo(Long productSoldId) {
        return queryFactory
                .selectFrom(specialSold)
                .where(specialSold.id.eq(productSoldId))
                .leftJoin(specialSold.user, user).fetchJoin()
                .leftJoin(specialSold.specialProduct, specialProduct).fetchJoin()
                .fetchOne();
    }
}
