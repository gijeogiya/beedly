package com.ssafy.beedly.dto;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.ssafy.beedly.domain.Category;
import com.ssafy.beedly.domain.PersonalProductImg;
import com.ssafy.beedly.domain.PersonalSold;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.SoldStatus;

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
	private User user;
	private List<PersonalProductImg> productImgs;
	private PersonalSold personalSold;

}
