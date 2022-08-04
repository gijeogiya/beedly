package com.ssafy.beedly.controller;

import com.ssafy.beedly.config.web.LoginUser;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.special.board.request.CreateSpecialBoardRequest;
import com.ssafy.beedly.dto.special.board.response.SpecialBoardResponse;
import com.ssafy.beedly.dto.special.board.response.SpecialBoardSimpleResponse;
import com.ssafy.beedly.service.SpecialBoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SpecialBoardController {

    private final SpecialBoardService specialBoardService;

    // 기획전 게시글 등록
    @ApiOperation(value = "기획전 게시글 등록", notes = "대표 이미지는 1개만\n" +
            "게시글 등록 데이터 request:\n {\n" +
            "  \"boardTitle\": \"기획전 제목\",\n" +
            "  \"boardSubTitle\": \"기획전 부제목\",\n" +
            "  \"boardDesc\": \"기획전 설명입니다.\",\n" +
            "  \"startTime\": \"2013-09-29T18:46:19Z\"\n" +
            "}\n")
    @PostMapping("/admin/special/board")
    public ResponseEntity createSpecialBoard(@ApiIgnore @LoginUser User user, @RequestPart CreateSpecialBoardRequest request, @RequestPart(required = false)MultipartFile image) {
        specialBoardService.createPost(user, request, image);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 기획전 게시글 상세 조회( + 상품정보)
    @ApiOperation(value = "기획전 게시글 상세 조회", notes = "상품 정보도 함께 리턴")
    @ApiImplicitParam(name = "boardId", value = "기획전 게시글 식별자")
    @GetMapping("/special/board/{boardId}")
    public ResponseEntity<SpecialBoardResponse> searchSpecialBoard(@PathVariable Long boardId) {
        return ResponseEntity.ok(specialBoardService.searchSpecialBoard(boardId));
    }

    // 진행 예정인 기획전 게시글 리스트 조회
    @ApiOperation(value = "기획전 게시글 리스트 조회", notes = "조회 시점으로 경매 예정인 게시글들만 조회")
    @GetMapping("/special/board")
    public ResponseEntity<List<SpecialBoardSimpleResponse>> searchWaitingSpecialBoards() {
        return ResponseEntity.ok(specialBoardService.searchWaitingSpecialBoards());
    }

}
