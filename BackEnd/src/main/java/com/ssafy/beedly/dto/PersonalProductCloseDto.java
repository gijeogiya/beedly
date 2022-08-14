package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.*;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class PersonalProductCloseDto {

    @ApiModelProperty(notes = "상시 상품 정보")
    private PersonalProductDto personalProductDto;

//    @ApiModelProperty(notes = "태그 이름들")
//    private List<SearchTagDto> tagNames = new ArrayList<>();


    @ApiModelProperty(notes = "서면 응찰 여부")
    private Boolean isAbsenteeBid = false;

    @ApiModelProperty(notes = "서면 응찰 식별자")
    private Long absenteeBidId;

    @ApiModelProperty(notes = "서면 응찰 가격")
    private Integer absenteeBidPrice;


    @ApiModelProperty(notes = "상품 찜 여부")
    private Boolean isFavorite = false;

    @ApiModelProperty(notes = "상품 찜 식별자")
    private Long favoriteId;


    @ApiModelProperty(notes = "현재 경매 진행중인지 아닌지")
    private Boolean isOnAir = false;

    @ApiModelProperty(notes = "상시 경매 식별자")
    private Long auctionId;

    public PersonalProductCloseDto(Long productId, List<String> tagNames, Integer absenteeBidPrice,Boolean isAbsenteeBid ,Boolean isFavorite) {
//        this.productId = productId;
//        this.tagNames = tagNames;
        this.absenteeBidPrice = absenteeBidPrice;
        this.isAbsenteeBid = isAbsenteeBid;
        this.isFavorite = isFavorite;
    }

    public PersonalProductCloseDto(PersonalProduct findProduct, List<SearchTag> searchTag, Optional<PersonalFavorite> personalFavorite, Optional<AbsenteeBid> absenteeBid, Optional<PersonalAuction> auctionInfo) {
        this.personalProductDto = new PersonalProductDto(findProduct);
//        this.tagNames = searchTag.stream().map(searchTag1 -> new SearchTagDto(searchTag1))
//                .collect(Collectors.toList());

        if (absenteeBid.isPresent()) {
            AbsenteeBid absenteeBidInfo = absenteeBid.get();
            this.isAbsenteeBid = true;
            this.absenteeBidId = absenteeBidInfo.getId();
            this.absenteeBidPrice = absenteeBidInfo.getAbsenteeBidPrice();
        }

        if (personalFavorite.isPresent()) {
            PersonalFavorite favoriteInfo = personalFavorite.get();
            this.isFavorite = true;
            this.favoriteId = favoriteInfo.getId();
        }

        if (auctionInfo.isPresent()) {
            PersonalAuction personalAuctionInfo = auctionInfo.get();
            this.isOnAir = true;
            this.auctionId = personalAuctionInfo.getId();
        }
    }
}
