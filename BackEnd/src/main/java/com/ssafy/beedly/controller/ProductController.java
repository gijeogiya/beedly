package com.ssafy.beedly.controller;

import com.ssafy.beedly.service.PersonalProductService;
import com.ssafy.beedly.service.SpecialProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("product")
@RequiredArgsConstructor
public class ProductController {

    private final PersonalProductService personalProductService;
    private final SpecialProductService specialProductService;

}
