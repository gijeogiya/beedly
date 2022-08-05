package com.ssafy.beedly.dto.special.board.response;

import com.ssafy.beedly.domain.SpecialBoard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecialBoardSimpleResponse {

    private Long boardId;
    private LocalDateTime startTime;
    private String boardTitle;
    private String boardSubtitle;
    private String boardDesc;
    private String mainImgUri;

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
}
