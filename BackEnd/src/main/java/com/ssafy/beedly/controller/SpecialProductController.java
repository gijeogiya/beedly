package com.ssafy.beedly.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.beedly.service.SpecialProductService;

@RestController
@RequestMapping("specialProduct")
@RequiredArgsConstructor
public class SpecialProductController {
   private final SpecialProductService specialProductService;
}
