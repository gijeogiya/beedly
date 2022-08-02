package com.ssafy.beedly.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.dto.PersonalProductDto;
import com.ssafy.beedly.service.PersonalProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("personalProduct")
@RequiredArgsConstructor
public class PersonalProductController {
	private final PersonalProductService personalProductService;

	// 1. personalProduct CRUD
	@PostMapping
	public ResponseEntity<?> saveProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.save(personalProduct);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@PatchMapping
	public ResponseEntity<?> updateProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.update(personalProduct);
		return  ResponseEntity.status(HttpStatus.OK).build();
	}

	@DeleteMapping
	public ResponseEntity<?> deleteProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.delete(personalProduct);
		return  ResponseEntity.status(HttpStatus.OK).build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?>getProductInfo(@PathVariable("id") int id) throws Exception{
		System.out.println(id);
		PersonalProduct product = personalProductService.getProductById((long)id).orElseGet(PersonalProduct::new);
		return ResponseEntity.ok(new PersonalProductDto(product));
	}

}
