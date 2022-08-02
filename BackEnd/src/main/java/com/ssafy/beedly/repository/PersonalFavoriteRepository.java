package com.ssafy.beedly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.beedly.domain.PersonalFavorite;
import com.ssafy.beedly.domain.PersonalProduct;

public interface PersonalFavoriteRepository  extends JpaRepository<PersonalFavorite, Long> {

	// @Query("select p from ")
	// List<PersonalProduct> findPersonalFavoriteByUser();
}
 