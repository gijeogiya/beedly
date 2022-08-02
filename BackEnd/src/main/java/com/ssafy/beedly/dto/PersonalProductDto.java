package com.ssafy.beedly.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.PersonalProductImg;
import com.ssafy.beedly.domain.PersonalSold;
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
	private Category category;
	private Long userId;
	private Integer favoriteCount;
	private List<PersonalProductImg> productImgs;
	private PersonalSold personalSold;


	public PersonalProductDto(PersonalProduct personalProduct){
		this.id = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.productDesc = personalProduct.getProductDesc();
		this.startPrice = personalProduct.getStartPrice();
		this.height = personalProduct.getHeight();
		this.weight = personalProduct.getWeight();
		this.depth = personalProduct.getDepth();
		this.soldStatus = personalProduct.getSoldStatus();
		this.startTime = personalProduct.getStartTime();
		this.category = personalProduct.getCategory();
		this.userId = personalProduct.getUser().getId();
		this.favoriteCount = personalProduct.getFavoriteCount();
		this.productImgs = personalProduct.getProductImgs();
		this.personalSold = personalProduct.getPersonalSold();
	}

}
