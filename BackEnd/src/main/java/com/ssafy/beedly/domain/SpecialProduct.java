package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.SoldStatus;
import com.ssafy.beedly.dto.special.product.request.CreateSpecialProductRequest;
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

    @Column(name = "s_artist_name")
    private String artistName;

    @Enumerated(EnumType.STRING)
    @Column(name = "s_sold_status")
    private SoldStatus soldStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "s_board_id")
    private SpecialBoard specialBoard;

    @OneToMany(mappedBy = "specialProduct")
    private List<SpecialProductImg> specialProductImgs = new ArrayList<>();

    public static SpecialProduct createSpecialProduct(CreateSpecialProductRequest request, Category findCategory, SpecialBoard findBoard) {
        SpecialProduct specialProduct = new SpecialProduct();
        specialProduct.productName = request.getProductName();
        specialProduct.productDesc = request.getProductDesc();
        specialProduct.startPrice = request.getStartPrice();
        specialProduct.height = request.getHeight();
        specialProduct.weight = request.getWeight();
        specialProduct.depth = request.getDepth();
        specialProduct.artistName = request.getArtistName();
        specialProduct.soldStatus = SoldStatus.STANDBY;
        specialProduct.category = findCategory;
        specialProduct.specialBoard = findBoard;

        return specialProduct;
    }

    public void updateSoldStatus(SoldStatus s) {
        this.soldStatus = s;
    }
}
