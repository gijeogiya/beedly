package com.ssafy.beedly.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.SoldStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.SoldStatus;

import com.ssafy.beedly.dto.SearchTagDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonalProductDto {

	@ApiModelProperty(notes = "상시 상품 식별자")
	private Long id;

	@ApiModelProperty(notes = "상시 상품 이름")
	private String productName;

	@ApiModelProperty(notes = "상시 상품 설명")
	private String productDesc;

	@ApiModelProperty(notes = "상시 상품 가격")
	private Integer startPrice;

	@ApiModelProperty(notes = "상시 상품 세로")
	private Integer height;

	@ApiModelProperty(notes = "상시 상품 가로")
	private Integer width;

	@ApiModelProperty(notes = "상시 상품 높이")
	private Integer depth;

	@ApiModelProperty(notes = "판매 상태: STANDBY, SUCCESS, FAIL")
	private SoldStatus soldStatus;

	@ApiModelProperty(notes = "경매 시작 시간")
	private LocalDateTime startTime;

	@ApiModelProperty(notes = "카테고리 식별자")
	private Long categoryId;

	@ApiModelProperty(notes = "카테고리 이름")
	private String categoryName;

	@ApiModelProperty(notes = "찜 개수")
	private Integer favoriteCount;

	@ApiModelProperty(notes = "상품 이미지들")
	private List<String> productImgs = new ArrayList<>();


	@ApiModelProperty(notes = "등록한 유저 식별자")
	private Long userId;

	@ApiModelProperty(notes = "등록한 유저 이름")
	private String userName;

	@ApiModelProperty(notes = "등록한 유저 닉네임")
	private String userNickname;

	@ApiModelProperty(notes = "등록한 작가 식별자")
	private Long artistId;

	@ApiModelProperty(notes = "등록한 작가 프로필 이미지")
	private String artistImg;

	@ApiModelProperty(notes = "밝기")
	private Integer brightness;
	@ApiModelProperty(notes = "채도")
	private Integer saturation;
	@ApiModelProperty(notes = "온도")
	private Integer temperature;

	@ApiModelProperty(notes = "검색태그 리스트들")
	private List<SearchTagDto> searchTagDtos = new ArrayList<>();


	public PersonalProductDto(PersonalProduct personalProduct){
		this.id = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.productDesc = personalProduct.getProductDesc();
		this.startPrice = personalProduct.getStartPrice();
		this.height = personalProduct.getHeight();
		this.width = personalProduct.getWidth();
		this.depth = personalProduct.getDepth();
		this.soldStatus = personalProduct.getSoldStatus();
		this.startTime = personalProduct.getStartTime();
		this.categoryId = personalProduct.getCategory().getId();
		this.categoryName = personalProduct.getCategory().getCategoryName();
		this.favoriteCount = personalProduct.getFavoriteCount();
		List<PersonalProductImg> productImgs = personalProduct.getProductImgs();
		for (PersonalProductImg productImg : productImgs) {
			this.productImgs.add(productImg.getImgUri());
		}

		this.userId = personalProduct.getUser().getId();
		this.userName = personalProduct.getUser().getUserName();
		this.userNickname = personalProduct.getUser().getUserNickname();
		this.artistId = personalProduct.getArtist().getId();
		this.artistImg = personalProduct.getArtist().getArtistProfileImg();
//		this.artistImg = personalProduct.getArtist().getArtistBgImg();
		//this.personalSoldId = personalProduct.getPersonalSold().getId();

		this.brightness = personalProduct.getBrightness();
		this.saturation = personalProduct.getSaturation();
		this.temperature = personalProduct.getTemperature();
		this.searchTagDtos = personalProduct.getSearchTags()
				.stream().map(personalSearchTag -> new com.ssafy.beedly.dto.SearchTagDto(personalSearchTag.getSearchTag()))
				.collect(Collectors.toList());
	}

	public PersonalProductDto(PersonalAuction personalAuction){
		PersonalProduct personalProduct = personalAuction.getPersonalProduct();
		this.id = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.productDesc = personalProduct.getProductDesc();
		this.startPrice = personalProduct.getStartPrice();
		this.height = personalProduct.getHeight();
		this.width = personalProduct.getWidth();
		this.depth = personalProduct.getDepth();
		this.soldStatus = personalProduct.getSoldStatus();
		this.startTime = personalProduct.getStartTime();
		this.categoryId = personalProduct.getCategory().getId();
		this.userId = personalProduct.getUser().getId();
		this.favoriteCount = personalProduct.getFavoriteCount();
		List<PersonalProductImg> productImgs = personalProduct.getProductImgs();
		for (PersonalProductImg productImg : productImgs) {
			this.productImgs.add(productImg.getImgUri());
		}
		this.userId = personalProduct.getUser().getId();
		this.userName = personalProduct.getUser().getUserName();
		this.userNickname = personalProduct.getUser().getUserNickname();
		this.artistId = personalProduct.getArtist().getId();
		this.artistImg = personalProduct.getArtist().getArtistProfileImg();
		//this.personalSoldId = personalProduct.getPersonalSold().getId();
		this.brightness = personalProduct.getBrightness();
		this.saturation = personalProduct.getSaturation();
		this.temperature = personalProduct.getTemperature();
		this.searchTagDtos = personalProduct.getSearchTags()
				.stream().map(personalSearchTag -> new com.ssafy.beedly.dto.SearchTagDto(personalSearchTag.getSearchTag()))
				.collect(Collectors.toList());
	}

	public PersonalProductDto(PersonalSearchTag pSearchTag){
		PersonalProduct personalProduct = pSearchTag.getPersonalProduct();
		this.id = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.productDesc = personalProduct.getProductDesc();
		this.startPrice = personalProduct.getStartPrice();
		this.height = personalProduct.getHeight();
		this.width = personalProduct.getWidth();
		this.depth = personalProduct.getDepth();
		this.soldStatus = personalProduct.getSoldStatus();
		this.startTime = personalProduct.getStartTime();
		this.categoryId = personalProduct.getCategory().getId();
		this.categoryName = personalProduct.getCategory().getCategoryName();
		this.userId = personalProduct.getUser().getId();
		this.userName = personalProduct.getUser().getUserName();
		this.userNickname = personalProduct.getUser().getUserNickname();
		this.artistId = personalProduct.getArtist().getId();
		this.artistImg = personalProduct.getArtist().getArtistProfileImg();
		this.favoriteCount = personalProduct.getFavoriteCount();
		List<PersonalProductImg> productImgs = personalProduct.getProductImgs();
		for (PersonalProductImg productImg : productImgs) {
			this.productImgs.add(productImg.getImgUri());
		}
		this.artistImg = personalProduct.getArtist().getArtistBgImg();
		//this.personalSoldId = personalProduct.getPersonalSold().getId();
		this.brightness = personalProduct.getBrightness();
		this.saturation = personalProduct.getSaturation();
		this.temperature = personalProduct.getTemperature();
		this.searchTagDtos = personalProduct.getSearchTags()
				.stream().map(personalSearchTag -> new com.ssafy.beedly.dto.SearchTagDto(personalSearchTag.getSearchTag()))
				.collect(Collectors.toList());
	}
}
