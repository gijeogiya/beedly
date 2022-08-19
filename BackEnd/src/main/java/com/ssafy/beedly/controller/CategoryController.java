package com.ssafy.beedly.controller;

import com.ssafy.beedly.dto.category.CategoryDto;
import com.ssafy.beedly.service.CategoryService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @ApiOperation(value = "카테고리 리스트 조회", notes = "카테고리 전체 가져오기")
    @GetMapping
    public ResponseEntity<List<CategoryDto>> findCategoryList() {
        return ResponseEntity.ok(categoryService.findCategoryList());
    }
}
