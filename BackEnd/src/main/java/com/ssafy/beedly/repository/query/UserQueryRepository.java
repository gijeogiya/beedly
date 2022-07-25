package com.ssafy.beedly.repository.query;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.beedly.domain.QUser;
import com.ssafy.beedly.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}
