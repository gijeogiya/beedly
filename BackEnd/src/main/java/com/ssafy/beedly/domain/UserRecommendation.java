package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter @Setter
@Table(name = "USER_RECOMMENDATION")
public class UserRecommendation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_rec_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_tag_id")
    private RecommendationTag recTag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public UserRecommendation(Long id, User user) {
        this.id = id;
        this.user = user;
    }


    public static UserRecommendation createUserRecommendation(User user, RecommendationTag tag) {
        UserRecommendation userRecommendation = new UserRecommendation();
        userRecommendation.user = user;
        userRecommendation.recTag = tag;
        return userRecommendation;
    }
}
