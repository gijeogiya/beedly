package com.ssafy.beedly.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectedTagsDto {

    @ApiModelProperty(notes = "태그 식별자들 리스트", example = "[1,3,6,7]")
    private List<Long> tags = new ArrayList<>();
}
