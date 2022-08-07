package com.ssafy.beedly.dto.tag.common;

import com.ssafy.beedly.domain.RecommendationTag;
import com.ssafy.beedly.domain.SearchTag;
import lombok.Data;

@Data
public class RecommendationTagDto {

    private Long id;
    private String name;
    private Integer brightness;
    private Integer saturation;
    private Integer temperature;

    public RecommendationTagDto(RecommendationTag rt) {
        this.id = rt.getId();
        this.name = rt.getRecTagName();
        this.brightness = rt.getRecTagBrightness();
        this.saturation = rt.getRecTagSaturation();
        this.temperature = rt.getRecTagTemperature();
    }
}

