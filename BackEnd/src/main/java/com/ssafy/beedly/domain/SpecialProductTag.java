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
@Table(name = "SPECIAL_PRODUCT_TAG")
public class SpecialProductTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_product_tag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_product_id")
    private SpecialProduct specialProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_tag_id")
    private Tag tag;
}
