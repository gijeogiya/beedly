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
@Table(name = "SPECIAL_PRODUCT_IMG")
public class SpecialProductImg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_img_id")
    private Long id;

    @Column(name = "s_img_uri")
    private String imgUri;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_product_id")
    private SpecialProduct specialProduct;

    public static SpecialProductImg createSpecialProductImg(String imgUri, SpecialProduct specialProduct) {
        SpecialProductImg specialProductImg = new SpecialProductImg();
        specialProductImg.imgUri = imgUri;
        specialProductImg.specialProduct = specialProduct;

        return specialProductImg;
    }
}
