package com.ssafy.beedly.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.SpecialProductImg;
import com.ssafy.beedly.domain.type.SoldStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialProductDto {
	private Long id;
	private String productName;
	private String productDesc;
	private Integer startPrice;
	private Integer height;
	private Integer weight;
	private Integer depth;
	private SoldStatus soldStatus;
	private Category category;
	private List<SpecialProductImg> specialProductImgs;

	public SpecialProductDto(SpecialProduct specialProduct){
		this.id = specialProduct.getId();
		this.productName = specialProduct.getProductName();
		this.productDesc = specialProduct.getProductDesc();
		this.startPrice = specialProduct.getStartPrice();
		this.height = specialProduct.getHeight();
		this.weight = specialProduct.getWeight();
		this.depth = specialProduct.getDepth();
		this.soldStatus = specialProduct.getSoldStatus();
		this.category = specialProduct.getCategory();
	}
}
