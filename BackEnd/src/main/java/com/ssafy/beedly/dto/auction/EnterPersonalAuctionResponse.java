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

    @ApiModelProperty(example = "상시 경매방 식별자(1)")
    private Long auctionId;

    @ApiModelProperty(example = "상품 식별자(1)")
    private Long productId;

    @ApiModelProperty(example = "상품 이름(폭풍의 눈물)")
    private String productName;

    @ApiModelProperty(example = "상품 설명(이 그림은 폭풍의 눈물입니다.)")
    private String productDesc;

    @ApiModelProperty(example = "시작 가격(500000)")
    private Integer startPrice;

    @ApiModelProperty(example = "작가 식별자(1)")
    private Long artistId;

    @ApiModelProperty(example = "작가 프로필 이미지 url")
    private String artistProfileImg;

    @ApiModelProperty(example = "회원 실명(박재권)")
    private String userName;

    @ApiModelProperty(example = "회원 닉네임(무느스크)")
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
