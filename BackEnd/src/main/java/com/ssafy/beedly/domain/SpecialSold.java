package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "SPECIAL_SOLD")
public class SpecialSold extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_sold_id")
    private Long id;

    @Column(name = "s_end_time")
    private LocalDateTime endTime;

    @Column(name = "s_final_price")
    private Integer finalPrice;

    @Column(name = "s_paid_flag")
    private Boolean paidFlag;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_product_id")
    private SpecialProduct specialProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
