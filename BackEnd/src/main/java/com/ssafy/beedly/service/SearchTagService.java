package com.ssafy.beedly.service;

import com.ssafy.beedly.domain.SearchTag;
import com.ssafy.beedly.dto.SearchTagDto;
import com.ssafy.beedly.repository.SearchTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchTagService {

    private final SearchTagRepository searchTagRepository;

    public List<SearchTagDto> searchTagList() {
        return searchTagRepository.findAll().stream().map(searchTag -> new SearchTagDto(searchTag)).collect(Collectors.toList());
    }
}
