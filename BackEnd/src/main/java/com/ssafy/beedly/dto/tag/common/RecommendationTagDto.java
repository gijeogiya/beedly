package com.ssafy.beedly.dto.tag.common;

import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.SearchTag;
import com.ssafy.beedly.domain.UserRecommendation;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Data;

@Data
public class RecommendationTagDto {

    @ApiModelProperty(notes = "추천 태그 식별자")
    private Long id;

    @ApiModelProperty(notes = "추천 태그 이름")
    private String name;

    @ApiModelProperty(notes = "밝기")
    private Integer brightness;

    @ApiModelProperty(notes = "채도")
    private Integer saturation;

    @ApiModelProperty(notes = "온도")
    private Integer temperature;

    public RecommendationTagDto(RecommendationTag rt) {
        this.id = rt.getId();
        this.name = rt.getRecTagName();
        this.brightness = rt.getRecTagBrightness();
        this.saturation = rt.getRecTagSaturation();
        this.temperature = rt.getRecTagTemperature();
    }

    public RecommendationTagDto(UserRecommendation ur) {
        RecommendationTag recTag = ur.getRecTag();
        this.id = recTag.getId();
        this.name = recTag.getRecTagName();
        this.brightness = recTag.getRecTagBrightness();
        this.saturation = recTag.getRecTagSaturation();
        this.temperature = recTag.getRecTagTemperature();
    }
}

