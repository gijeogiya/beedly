package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.SearchTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchTagRepository extends JpaRepository<SearchTag, Long> {

}
