package com.ssafy.beedly.dto.tag.common;

import com.ssafy.beedly.domain.SearchTag;
import lombok.Data;

@Data
public class SearchTagDto {

    private Long id;
    private String name;

    public SearchTagDto(SearchTag st) {
        this.id = st.getId();
        this.name = st.getSearchTagName();
    }
}

