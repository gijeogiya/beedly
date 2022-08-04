package com.ssafy.beedly.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.SoldStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.SoldStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonalProductDto {
	private Long id;
	private String productName;
	private String productDesc;
	private Integer startPrice;
	private Integer height;
	private Integer weight;
	private Integer depth;
	private SoldStatus soldStatus;
	private LocalDateTime startTime;
	private Long categoryId;
	private Long userId;
	private Integer favoriteCount;
	private List<String> productImgs = new ArrayList<>();
	//private Long personalSoldId;

	private String artistImg;


	public PersonalProductDto(PersonalProduct personalProduct){
		this.id = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.productDesc = personalProduct.getProductDesc();
		this.startPrice = personalProduct.getStartPrice();
		this.height = personalProduct.getHeight();
		this.weight = personalProduct.getWidth();
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
		this.artistImg = personalProduct.getArtist().getArtistBgImg();
		//this.personalSoldId = personalProduct.getPersonalSold().getId();
	}

	public PersonalProductDto(PersonalAuction personalAuction){
		PersonalProduct personalProduct = personalAuction.getPersonalProduct();
		this.id = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.productDesc = personalProduct.getProductDesc();
		this.startPrice = personalProduct.getStartPrice();
		this.height = personalProduct.getHeight();
		this.weight = personalProduct.getWidth();
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
		this.artistImg = personalProduct.getArtist().getArtistBgImg();
		//this.personalSoldId = personalProduct.getPersonalSold().getId();
	}
}
