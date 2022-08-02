package com.ssafy.beedly.repository.query;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.beedly.domain.AbsenteeBid;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class AbsenteeBidQueryRepository {
//    static private JPAQueryFactory queryFactory;

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void addAbsenteeBid(AbsenteeBid absenteeBid) {
        em.createNativeQuery("INSERT INTO ABSENTEE_BID (absentee_bid_id, absentee_bid_price, product_id, user_id) VALUES (?,?,?,?)")
                .setParameter(1, absenteeBid.getId())
                .setParameter(2, absenteeBid.getAbsenteeBidPrice())
                .setParameter(3, absenteeBid.getPersonalProduct())
                .setParameter(4, absenteeBid.getUser())
                .executeUpdate();
    }
}

