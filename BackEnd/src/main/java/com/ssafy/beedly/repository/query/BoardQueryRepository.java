package com.ssafy.beedly.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class BoardQueryRepository {
    static private JPAQueryFactory queryFactory;
}
