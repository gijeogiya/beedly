package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.BoardType;
import com.ssafy.beedly.dto.BoardDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(name = "board_title")
    private String boardTitle;

    @Column(name = "board_content")
    private String boardContent;

    @Column(name = "board_type")
    @Enumerated(EnumType.STRING)
    private BoardType boardType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static Board createBoard(User user, BoardDto request) {
        Board board = new Board();
        board.boardTitle = request.getBoardTitle();
        board.boardContent = request.getBoardContent();
        board.boardType = request.getBoardType();
        board.user = user;
        return board;
    }

    public void updateBoard(String title, String content) {
        this.boardTitle = title;
        this.boardContent = content;
    }

}
