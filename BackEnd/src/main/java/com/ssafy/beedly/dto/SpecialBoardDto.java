package com.ssafy.beedly.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ssafy.beedly.domain.SpecialBoard;
import com.ssafy.beedly.domain.SpecialProduct;
import com.ssafy.beedly.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialBoardDto {
	private Long id;
	private Long userId;
	private LocalDateTime startTime;
	private String boardTitle;
	private String boardSubtitle;
	private String boardDesc;
	private String mainImgUri;
	List<SpecialProduct> specialProducts;

	public SpecialBoardDto(SpecialBoard specialBoard) {
		this.id = specialBoard.getId();
		this.userId = specialBoard.getUser().getId();
		this.startTime = specialBoard.getStartTime();
		this.boardTitle = specialBoard.getBoardTitle();
		this.boardSubtitle = specialBoard.getBoardSubtitle();
		this.boardDesc = specialBoard.getBoardDesc();
		this.mainImgUri = specialBoard.getMainImgUri();
		this.specialProducts = specialBoard.getSpecialProducts();
	}
}
