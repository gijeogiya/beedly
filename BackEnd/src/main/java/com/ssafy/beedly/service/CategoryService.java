package com.ssafy.beedly.service;

import com.ssafy.beedly.dto.category.CategoryDto;
import com.ssafy.beedly.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> findCategoryList() {
        return categoryRepository.findAll().stream().map(category -> new CategoryDto(category))
                .collect(Collectors.toList());
    }
}
