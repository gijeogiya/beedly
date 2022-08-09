package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.Board;
import com.ssafy.beedly.domain.type.BoardType;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query(value = "select b from Board b where b.boardType = :boardType")
    List<Board> findBoardByType(@Param("boardType") BoardType boardType);

}
