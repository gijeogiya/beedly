package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.SoldStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "PERSONAL_PRODUCT")
public class PersonalProduct extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_product_id")
    private Long id;

    @Column(name = "p_product_name")
    private String productName;

    @Column(name = "p_product_desc")
    private String productDesc;

    @Column(name = "p_start_price")
    private int startPrice;

    @Column(name = "p_product_h")
    private int height;

    @Column(name = "p_product_w")
    private int weight;

    @Column(name = "p_product_d")
    private int depth;

    @Enumerated(EnumType.STRING)
    @Column(name = "p_sold_status")
    private SoldStatus soldStatus;

    @Column(name = "p_start_time")
    private LocalDateTime startTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "personalProduct")
    private List<PersonalProductImg> productImgs = new ArrayList<>();
}
