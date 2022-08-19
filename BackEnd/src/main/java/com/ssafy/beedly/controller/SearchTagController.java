package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.SearchTagDto;
import com.ssafy.beedly.service.SearchTagService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchTagController {

    private final SearchTagService searchTagService;

    @GetMapping("/searchtag")
    @ApiOperation(notes = "검색태그 전체 리스트 검색", value = "검색태그 전체 리스트 검색하기")
    public ResponseEntity<List<SearchTagDto>> searchTagList() {
        return ResponseEntity.ok(searchTagService.searchTagList());
    }
}
