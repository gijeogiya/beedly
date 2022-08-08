package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.SearchTag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchTagDto {
    private Long id;
    private String searchTagName;

    public SearchTagDto(SearchTag searchTag) {
        this.id = searchTag.getId();
        this.searchTagName = searchTag.getSearchTagName();
    }
}
