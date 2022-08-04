package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.SoldStatus;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter @Setter
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
    private Integer startPrice;

    @Column(name = "p_product_h")
    private Integer height;

    @Column(name = "p_product_w")
    private Integer weight;

    @Column(name = "p_product_d")
    private Integer depth;

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

    @OneToOne(mappedBy = "personalProduct")
    private PersonalSold personalSold;

    public PersonalProduct(String productName) {
        this.productName = productName;
    }

    @Override
    public String toString() {
        return "PersonalProduct{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", productDesc='" + productDesc + '\'' +
                ", startPrice=" + startPrice +
                ", height=" + height +
                ", weight=" + weight +
                ", depth=" + depth +
                ", soldStatus=" + soldStatus +
                ", startTime=" + startTime +
                ", category=" + category +
                ", user=" + user +
                ", productImgs=" + productImgs +
                ", personalSold=" + personalSold +
                '}';
    }

    public static PersonalProduct createPersonalProduct(CreatePersonalProductRequest request, Category category, User user) {
        PersonalProduct personalProduct = new PersonalProduct();
        personalProduct.productName = request.getProductName();
        personalProduct.productDesc = request.getProductDesc();
        personalProduct.startPrice = request.getStartPrice();
        personalProduct.height = request.getHeight();
        personalProduct.weight = request.getWeight();
        personalProduct.depth = request.getDepth();
        personalProduct.soldStatus = SoldStatus.STANDBY;
        personalProduct.startTime = request.getStartTime();
        personalProduct.category = category;
        personalProduct.user = user;

        return personalProduct;
    }
}
