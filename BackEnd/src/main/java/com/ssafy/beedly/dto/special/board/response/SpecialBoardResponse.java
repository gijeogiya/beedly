package com.ssafy.beedly.dto.special.board.response;

import com.ssafy.beedly.domain.SpecialBoard;
import com.ssafy.beedly.dto.special.product.response.SpecialProductResponse;
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

    private Long boardId;
    private LocalDateTime startTime;
    private String boardTitle;
    private String boardSubtitle;
    private String boardDesc;
    private String mainImgUri;

    private Long userId;

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
