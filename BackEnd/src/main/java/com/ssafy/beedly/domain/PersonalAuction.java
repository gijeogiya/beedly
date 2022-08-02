package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "PERSONAL_AUCTION")
public class PersonalAuction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "p_active_flag")
    private Boolean activeFlag;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_product_id")
    private PersonalProduct personalProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static PersonalAuction createPersonalAuction(PersonalProduct p, User u) {
        PersonalAuction personalAuction = new PersonalAuction();
        personalAuction.activeFlag = true;
        personalAuction.personalProduct = p;
        personalAuction.user = u;
        return personalAuction;
    }

    public void closeAuction() {
        this.activeFlag = false;
    }
}
