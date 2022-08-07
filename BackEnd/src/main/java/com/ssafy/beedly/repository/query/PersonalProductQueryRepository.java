package com.ssafy.beedly.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PersonalProductQueryRepository {
    static private JPAQueryFactory queryFactory;
}
