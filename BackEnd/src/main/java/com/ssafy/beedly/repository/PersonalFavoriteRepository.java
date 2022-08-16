package com.ssafy.beedly.repository;

import java.util.List;

import com.ssafy.beedly.dto.PersonalProductDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.beedly.domain.PersonalFavorite;
import com.ssafy.beedly.domain.PersonalProduct;

public interface PersonalFavoriteRepository  extends JpaRepository<PersonalFavorite, Long> {

	// @Query("select p from ")
	// List<PersonalProduct> findPersonalFavoriteByUser();

    @Query("select pf from PersonalFavorite pf join fetch pf.personalProduct where pf.user.id = :userId")
    List<PersonalFavorite> findMyFavoriteProductWithProduct(Long userId);
}