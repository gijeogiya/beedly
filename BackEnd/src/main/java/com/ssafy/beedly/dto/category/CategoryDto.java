package com.ssafy.beedly.dto.category;

import com.ssafy.beedly.domain.Category;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {

    @ApiModelProperty(notes = "카테고리 식별자")
    private Long categoryId;

    @ApiModelProperty(notes = "카테고리 이름")
    private String categoryName;

    public CategoryDto(Category category) {
        this.categoryId = category.getId();
        this.categoryName = category.getCategoryName();
    }
}
