package com.ssafy.beedly.dto;

import java.time.LocalDateTime;
import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.PersonalProduct;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductAndArtistDto {
	//Product
	private Long productId;
	private String productName;
	private Long userId;
	private LocalDateTime startTime;

	//Artist
	private Long artistId;
	private String artistDesc;
	private String artistProfileImg;
	private String artistBgImg;


	public ProductAndArtistDto(PersonalProduct personalProduct, Artist artist){
		this.productId = personalProduct.getId();
		this.productName = personalProduct.getProductName();
		this.userId = personalProduct.getUser().getId();
		this.startTime = personalProduct.getStartTime();
		this.artistId = artist.getId();
		this.artistDesc = artist.getArtistDesc();
		this.artistProfileImg = artist.getArtistProfileImg();
		this.artistBgImg = artist.getArtistBgImg();
	}

}
