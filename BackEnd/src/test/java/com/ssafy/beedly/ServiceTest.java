package com.ssafy.beedly;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.repository.PersonalProductRepository;
import com.ssafy.beedly.service.PersonalProductService;

@SpringBootTest
@Transactional
public class ServiceTest {
	@Autowired
	PersonalProductService personalProductService;
	@Autowired
	PersonalProductRepository personalProductRepository;

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

}
