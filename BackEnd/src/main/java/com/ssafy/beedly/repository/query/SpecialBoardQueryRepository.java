package com.ssafy.beedly.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.beedly.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.beedly.domain.QCategory.category;
import static com.ssafy.beedly.domain.QSpecialAuction.specialAuction;
import static com.ssafy.beedly.domain.QSpecialBoard.specialBoard;
import static com.ssafy.beedly.domain.QSpecialProduct.*;
import static com.ssafy.beedly.domain.QSpecialProductImg.specialProductImg;

@Repository
@RequiredArgsConstructor
public class SpecialBoardQueryRepository {

    private final JPAQueryFactory queryFactory;

    public SpecialBoard findByIdWithProducts(Long boardId) {
        return queryFactory.select(specialBoard).distinct()
                .from(specialBoard)
                .where(specialBoard.id.eq(boardId))
                .leftJoin(specialBoard.specialProducts, specialProduct).fetchJoin()
                .leftJoin(specialProduct.category, category).fetchJoin()
                .leftJoin(specialBoard.specialAuction, specialAuction).fetchJoin()
                .leftJoin(specialProduct.specialProductImgs, specialProductImg)
                .fetchOne();
    }
}
