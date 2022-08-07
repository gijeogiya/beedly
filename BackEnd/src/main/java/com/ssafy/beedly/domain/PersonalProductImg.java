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
@Table(name = "PERSONAL_PRODUCT_IMG")
public class PersonalProductImg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_img_id")
    private Long id;

    @Column(name = "p_img_uri")
    private String imgUri;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_product_id")
    private PersonalProduct personalProduct;

    public static PersonalProductImg createSpecialProductImg(String imageUrl, PersonalProduct savePersonalProduct) {
        PersonalProductImg personalProductImg = new PersonalProductImg();
        personalProductImg.imgUri = imageUrl;
        personalProductImg.personalProduct = savePersonalProduct;

        return personalProductImg;
    }
}
