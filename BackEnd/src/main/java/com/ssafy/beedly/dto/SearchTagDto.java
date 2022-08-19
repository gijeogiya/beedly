package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.SearchTag;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchTagDto {

    @ApiModelProperty(notes = "검색태그 식별자")
    private Long id;

    @ApiModelProperty(notes = "검색태그 이름")
    private String searchTagName;

    public SearchTagDto(SearchTag searchTag) {
        this.id = searchTag.getId();
        this.searchTagName = searchTag.getSearchTagName();
    }
}
