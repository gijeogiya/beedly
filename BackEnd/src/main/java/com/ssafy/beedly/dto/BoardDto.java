package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.Board;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.BoardType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String boardTitle;
    private String boardContent;
    private BoardType boardType;

    public BoardDto(Board board) {
        this.id = board.getId();
        this.boardTitle = board.getBoardTitle();
        this.boardContent = board.getBoardContent();
        this.boardType = board.getBoardType();
    }
}
