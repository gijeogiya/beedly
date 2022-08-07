package com.ssafy.beedly;

import java.util.Collections;
import java.util.List;


import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.domain.type.Gender;
import com.ssafy.beedly.repository.AbsenteeBidRepository;
import com.ssafy.beedly.repository.UserRecommendationRepository;
import com.ssafy.beedly.repository.UserRepository;
import com.ssafy.beedly.repository.query.AbsenteeBidQueryRepository;
import com.ssafy.beedly.service.AbsenteeBidService;
import com.ssafy.beedly.service.UserRecommendationService;
import com.ssafy.beedly.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.ssafy.beedly.domain.PersonalProduct;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
//@Transactional
public class ServiceTest {

	/*
@SpringBootTest
@Transactional
public class ServiceTest {
	@Autowired
	PersonalProductService personalProductService;

	@Autowired
	SpecialBoardRepository specialBoardRepository;

	@Autowired
	PersonalProductRepository personalProductRepository;
	private Object Collections;



	@Test
	public void CRUD(){
		PersonalProduct personalProduct = new PersonalProduct("안녕");
		personalProductService.save(personalProduct);

		PersonalProduct product1 = personalProductRepository.findPersonalProductByProductNameLike(
			personalProduct.getProductName()).get(0);

		System.out.println(product1.getId());

		product1.setProductName("안녕하세요");
		personalProductService.update(product1);

		List<PersonalProduct> product2 = personalProductRepository.findPersonalProductByProductNameLike(
			"안녕");

		System.out.println(product2);
	}

	@Test
	public void Category(){
		List<PersonalProduct> products = personalProductRepository.findPersonalProductByOrderByStartTimeAsc("회화");
		List<PersonalProduct> products = personalProductRepository.findPersonalProductByOrderByStartTime("회화");
		System.out.println(products);
	}

	@Test
	public void SpecialBoardRepository(){
		List<SpecialAuction> boards = specialBoardRepository.findSpecialBoardByOnAirOrderByStartTimeDesc();
		for (SpecialAuction board : boards) {

			System.out.println(board.getId());
		}
	}
	 */

	/*
	@Autowired
	AbsenteeBidRepository absenteeBidRepository;

	@Autowired
	AbsenteeBidQueryRepository absenteeBidQueryRepository;

	@Autowired
	AbsenteeBidService absenteeBidService;

	@Test
	public void setAbsenteeBidQueryRepository() {
		AbsenteeBid absenteeBid = new AbsenteeBid(null, 500000, new PersonalProduct(4L, null,null,null,null,null,null,null,null,null,null,null,null), new User(1L, null, null, null, null, null, null, null, null, null));
		absenteeBidRepository.save(absenteeBid);
		absenteeBidService.save(absenteeBid);
		absenteeBidService.update(absenteeBid);
	}
	 */

	@Autowired
	UserRecommendationRepository userRecommendationRepository;
	@Autowired
	UserRecommendationService userRecommendationService;

	@Test
	public void addUserRecommendationTag() {
		List<Long> selectedTags = new ArrayList<>();
		Long l = 1L;
		for (int i = 1; i <= 5; i++) {
			selectedTags.add(l++);
		}
		User user = new User(1L);
		UserRecommendation userRecommendation = new UserRecommendation(1L, user);
		for (Long id: selectedTags
			 ) {
			RecommendationTag recommendationTag = new RecommendationTag(id);
			userRecommendation.setRecTag(recommendationTag);
			userRecommendationRepository.save(userRecommendation);
		}
	}

}
