package com.ssafy.beedly.dto.special.board.response;

import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialBoard;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialBoardSimpleResponse {

    @ApiModelProperty(notes = "기획전 게시글 식별자")
    private Long boardId;

    @ApiModelProperty(notes = "기획전 경매 시작 시간(YYYY-MM-DDTHH:mm:sszz)")
    private LocalDateTime startTime;

    @ApiModelProperty(notes = "기획전 게시글 제목")
    private String boardTitle;

    @ApiModelProperty(notes = "기획전 게시글 부제목")
    private String boardSubtitle;

    @ApiModelProperty(notes = "기획전 설명")
    private String boardDesc;

    @ApiModelProperty(notes = "기획전 대표 이미지 url")
    private String mainImgUri;

    @ApiModelProperty(notes = "작성자 식별자")
    private Long userId;

    public SpecialBoardSimpleResponse(SpecialBoard sb) {
        this.boardId = sb.getId();
        this.startTime = sb.getStartTime();
        this.boardTitle = sb.getBoardTitle();
        this.boardSubtitle = sb.getBoardSubtitle();
        this.boardDesc = sb.getBoardDesc();
        this.mainImgUri = sb.getMainImgUri();
        this.userId = sb.getUser().getId();
    }

    public SpecialBoardSimpleResponse(SpecialAuction sa) {
        SpecialBoard sb = sa.getSpecialBoard();
        this.boardId = sb.getId();
        this.startTime = sb.getStartTime();
        this.boardTitle = sb.getBoardTitle();
        this.boardSubtitle = sb.getBoardSubtitle();
        this.boardDesc = sb.getBoardDesc();
        this.mainImgUri = sb.getMainImgUri();
        this.userId = sb.getUser().getId();
    }
}
