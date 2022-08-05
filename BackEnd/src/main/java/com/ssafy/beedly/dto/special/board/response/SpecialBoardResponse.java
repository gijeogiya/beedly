package com.ssafy.beedly.dto.special.board.response;

import com.ssafy.beedly.domain.SpecialBoard;
import com.ssafy.beedly.dto.special.product.response.SpecialProductResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialBoardResponse {

    @ApiModelProperty(notes = "기획전 게시글 식별자")
    private Long boardId;

    @ApiModelProperty(notes = "기획전 경매 시작 시간")
    private LocalDateTime startTime;

    @ApiModelProperty(notes = "기획전 게시글 제목")
    private String boardTitle;

    @ApiModelProperty(notes = "기획전 게시글 부제목")
    private String boardSubtitle;

    @ApiModelProperty(notes = "기획전 게시글 설명")
    private String boardDesc;

    @ApiModelProperty(notes = "기획전 게시글 대표 이미지")
    private String mainImgUri;

    @ApiModelProperty(notes = "기획전 등록자")
    private Long userId;

    @ApiModelProperty(notes = "기획전에 등록된 상품들")
    private List<SpecialProductResponse> specialProducts = new ArrayList<>();

    public SpecialBoardResponse(SpecialBoard sb) {
        this.boardId = sb.getId();
        this.startTime = sb.getStartTime();
        this.boardTitle = sb.getBoardTitle();
        this.boardSubtitle = sb.getBoardSubtitle();
        this.boardDesc = sb.getBoardDesc();
        this.mainImgUri = sb.getMainImgUri();
        this.userId = sb.getUser().getId();
        this.specialProducts = sb.getSpecialProducts().stream().map(specialProduct -> new SpecialProductResponse(specialProduct)).collect(Collectors.toList());
    }
}
