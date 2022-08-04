package com.ssafy.beedly.dto.special.board.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSpecialBoardRequest {

    private String boardTitle;
    private String boardSubTitle;
    private String boardDesc;
    // YYYY-MM-DDTHH:mm:sszz
    private LocalDateTime startTime;

}
