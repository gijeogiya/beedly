package com.ssafy.beedly.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.beedly.domain.PersonalProduct;
import com.ssafy.beedly.service.PersonalProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("specialProduct")
@RequiredArgsConstructor
public class PersonalProductController {
	private final PersonalProductService personalProductService;

	@PostMapping
	public ResponseEntity<?> saveProductInfo(@RequestBody PersonalProduct personalProduct){
		personalProductService.save(personalProduct);
		return ResponseEntity.status(HttpStatus.OK).build();
	}


}
