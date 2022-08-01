package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.PersonalAuction;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterPersonalAuctionResponse {

    private Long auctionId;

    private Long productId;
    private String productName;
    private String productDesc;
    private Integer startPrice;

    private Long artistId;
    private String artistProfileImg;

    private String userName;
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
