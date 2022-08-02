package com.ssafy.beedly.dto;

import java.time.LocalDateTime;

public class ProductAndArtistDto {
	//Product
	private Long product_id;
	private String productName;
	private Long user_id;
	private LocalDateTime startTime;

	//Artist
	private Long artist_id;
	private String artistDesc;
	private String artistProfileImg;
	private String artistBgImg;


}
