package com.ssafy.beedly.dto.tag.common;

import com.ssafy.beedly.domain.Tag;
import lombok.Data;

@Data
public class TagDto {

    private Long id;
    private String name;

    public TagDto(Tag t) {
        this.id = t.getId();
        this.name = t.getTagName();
    }
}

