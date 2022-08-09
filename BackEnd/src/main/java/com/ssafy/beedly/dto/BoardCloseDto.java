package com.ssafy.beedly.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardCloseDto {
    private Long boardId;
    private String title;
    private String content;

    public BoardCloseDto(Long boardId, String title, String content) {
        this.boardId = boardId;
        this.title = title;
        this.content = content;
    }
}
