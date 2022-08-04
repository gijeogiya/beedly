package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class RecommendationTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_tag_id")
    private Long id;

    @Column(name = "rec_tag_name")
    private String recTagName;

    @Column(name = "rec_tag_brightness")
    private Integer recTagBrightness;

    @Column(name = "rec_tag_saturation")
    private Integer recTagSaturation;

    @Column(name = "rec_tag_temperature")
    private Integer recTagTemperature;
}
