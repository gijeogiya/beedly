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
<<<<<<< HEAD
=======
 
>>>>>>> 6526eaf36b75a27a7860070b6e4654d0bb158761
