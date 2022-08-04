package com.ssafy.beedly.domain;

import java.util.ArrayList;
import java.util.List;

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
@Table(name = "SEARCH_TAG")
public class SearchTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "search_tag_id")
    private Long id;

    @Column(name = "search_tag_name")
    private String searchTagName;

}
