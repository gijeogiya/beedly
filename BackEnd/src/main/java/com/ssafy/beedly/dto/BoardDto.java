package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.Board;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.BoardType;

public class BoardDto {
    private Long id;
    private String boardTitle;
    private String boardContent;
    private BoardType boardType;
    private User user;

    public BoardDto(Board board) {
        this.id = board.getId();
        this.boardTitle = board.getBoardTitle();
        this.boardContent = board.getBoardContent();
        this.boardType = board.getBoardType();
        this.user = board.getUser();
    }
}
