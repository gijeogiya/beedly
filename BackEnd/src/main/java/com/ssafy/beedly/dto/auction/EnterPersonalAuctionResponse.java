package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.PersonalAuction;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterPersonalAuctionResponse implements Serializable {

    @ApiModelProperty(notes = "상시 경매방 식별자", example = "1")
    private Long auctionId;

    @ApiModelProperty(notes = "상품 식별자", example = "1")
    private Long productId;

    @ApiModelProperty(notes = "상품 이름", example = "폭풍의 눈물")
    private String productName;

    @ApiModelProperty(notes = "상품 설명", example = "폭풍처럼 휘몰아치는 눈물을 그렸습니다.")
    private String productDesc;

    @ApiModelProperty(notes = "시작 가격", example = "500000")
    private Integer startPrice;

    @ApiModelProperty(notes = "작가 식별자", example = "1")
    private Long artistId;

    @ApiModelProperty(notes = "작가 프로필 이미지 url")
    private String artistProfileImg;

    @ApiModelProperty(notes = "회원 실명")
    private String userName;

    @ApiModelProperty(notes = "회원 닉네임")
    private String userNickname;


    public EnterPersonalAuctionResponse(PersonalAuction pa, Artist a, User u) {
        this.auctionId = pa.getId();

        PersonalProduct p = pa.getPersonalProduct();
        this.productId = p.getId();
        this.productName = p.getProductName();
        this.productDesc = p.getProductDesc();
        this.startPrice = p.getStartPrice();

        this.artistId = a.getId();
        this.artistProfileImg = a.getArtistProfileImg();

        this.userName = u.getUserName();
        this.userNickname = u.getUserNickname();
    }
}
