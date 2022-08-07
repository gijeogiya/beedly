package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter @Setter
@Table(name = "RECOMMENDATION_TAG")
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

//    @OneToMany(mappedBy = "recommendationTag")
//    private List<UserRecommendation> tags = new ArrayList<>();


    public RecommendationTag(Long id) {
        this.id = id;
    }


}
