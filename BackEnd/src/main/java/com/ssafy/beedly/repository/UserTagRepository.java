package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.Tag;
import com.ssafy.beedly.domain.UserTag;
import com.ssafy.beedly.dto.tag.common.TagDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserTagRepository extends JpaRepository<UserTag, Long> {

    @Query("select new com.ssafy.beedly.dto.tag.common.TagDto(u.tag) from UserTag u left join u.tag where u.user.id = :userId")
    List<TagDto> findUserTagWithTagByUserId(@Param("userId") Long userId);
}

