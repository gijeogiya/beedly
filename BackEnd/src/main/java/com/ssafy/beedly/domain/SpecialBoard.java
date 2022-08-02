package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class  SpecialBoard extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "s_board_id")
    private Long id;

    @Column(name = "s_start_time")
    private LocalDateTime startTime;

    @Column(name = "s_board_title")
    private String boardTitle;

    @Column(name = "s_board_subtitle")
    private String boardSubtitle;

    @Column(name = "s_board_desc")
    private String boardDesc;

    @Column(name = "s_main_img_uri")
    private String mainImgUri;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "specialBoard")
    private List<SpecialProduct> specialProducts = new ArrayList<>();

}
