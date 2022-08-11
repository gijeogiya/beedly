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
@Table(name = "PERSONAL_SEARCH_TAG")
public class PersonalSearchTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_search_tag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_product_id")
    private PersonalProduct personalProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "search_tag_id")
    private SearchTag searchTag;

    public static PersonalSearchTag createPersonalSearchTag(PersonalProduct save, SearchTag searchTag) {
        PersonalSearchTag personalSearchTag = new PersonalSearchTag();
        personalSearchTag.personalProduct = save;
        personalSearchTag.searchTag = searchTag;

        return personalSearchTag;
    }
}
