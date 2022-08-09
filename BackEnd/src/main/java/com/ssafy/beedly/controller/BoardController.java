package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.Board;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.BoardDto;
import com.ssafy.beedly.service.BoardService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Api(value = "게시판 컨트롤러")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> createBoard(@LoginUser User user, @RequestBody BoardDto board) {
        boardService.save(user, board);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<?> updateBoard(@LoginUser User user, @RequestBody BoardDto board, @PathVariable Long boardId) {
        boardService.update(user, board,boardId);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@LoginUser User user, @PathVariable Long boardId) {
        boardService.delete(user, boardId);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{boardType}")
    public ResponseEntity<?> getBoardById(@PathVariable("boardType") String boardType) {
        return ResponseEntity.ok(boardService.getBoardByType(boardType));
    }

    @GetMapping("/close/{boardId}")
    public ResponseEntity<?> getBoardClose(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(boardService.getBoardByIdClose(boardId));
    }
}
