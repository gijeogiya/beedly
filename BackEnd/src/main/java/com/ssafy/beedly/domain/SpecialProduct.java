package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.SoldStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "SPECIAL_PRODUCT")
public class SpecialProduct extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_product_id")
    private Long id;

    @Column(name = "s_product_name")
    private String productName;

    @Column(name = "s_product_desc")
    private String productDesc;

    @Column(name = "s_start_price")
    private Integer startPrice;

    @Column(name = "s_product_h")
    private Integer height;

    @Column(name = "s_product_w")
    private Integer weight;

    @Column(name = "s_product_d")
    private Integer depth;

    @Enumerated(EnumType.STRING)
    @Column(name = "s_sold_status")
    private SoldStatus soldStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_board_id")
    private SpecialBoard specialBoard;

    @OneToMany(mappedBy = "specialProduct")
    private List<SpecialProductImg> specialProductImgs = new ArrayList<>();
}
