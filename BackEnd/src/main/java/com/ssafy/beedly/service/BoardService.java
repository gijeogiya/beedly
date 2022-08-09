package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.Board;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.BoardType;
import com.ssafy.beedly.domain.type.UserRole;
import com.ssafy.beedly.dto.BoardCloseDto;
import com.ssafy.beedly.dto.BoardDto;
import com.ssafy.beedly.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.beedly.common.exception.NotFoundException.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public void save(User user, BoardDto board) {
        Board newBoard = boardRepository.save(Board.createBoard(user, board));
    }

    @Transactional
    public void update(User user, BoardDto board, Long boardId) {
        Board findBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new NotFoundException(BOARD_NOT_FOUND));
        String title = board.getBoardTitle();
        String content = board.getBoardContent();
        findBoard.updateBoard(title,content);
    }

    @Transactional
    public void delete(User user, Long boardId) {
        Board findBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new NotFoundException(BOARD_NOT_FOUND));
        boardRepository.delete(findBoard);
    }

    public List<BoardDto> getBoardByType(String boardType) {
        BoardType type = null;
        if(boardType.equals("NOTICE")) {
            type = BoardType.NOTICE;
        } else if(boardType.equals("FAQ")) {
            type = BoardType.FAQ;
        }
        List<BoardDto> boards = boardRepository.findBoardByType(type)
                .stream().map(BoardDto::new).collect(Collectors.toList());
        return boards;
    }

    public BoardCloseDto getBoardByIdClose(Long boardId) {
        BoardCloseDto boardCloseDto = new BoardCloseDto();
        boardCloseDto.setBoardId(boardId);
        Board findBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new NotFoundException(BOARD_NOT_FOUND));
        boardCloseDto.setTitle(findBoard.getBoardTitle());
        boardCloseDto.setContent(findBoard.getBoardContent());
        return boardCloseDto;
    }
}
