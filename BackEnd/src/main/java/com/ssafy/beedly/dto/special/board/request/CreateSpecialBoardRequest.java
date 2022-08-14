package com.ssafy.beedly.dto.special.board.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSpecialBoardRequest {

    @ApiModelProperty(notes = "기획전 게시글 제목")
    private String boardTitle;

    @ApiModelProperty(notes = "기획전 게시글 부제목")
    private String boardSubTitle;

    @ApiModelProperty(notes = "기획전 설명")
    private String boardDesc;

    // YYYY-MM-DDTHH:mm:sszz
    @ApiModelProperty(notes = "YYYY-MM-DDTHH:mm:sszz")
    private LocalDateTime startTime;

}
