package com.ssafy.beedly.controller;

import com.ssafy.beedly.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
public class SpecialBoardController {

    @PostMapping("/admin/special/board")
    public void createSpecialBoard(@ApiIgnore User user, @RequestBody CreateSpecialBoardRequest request) {

    }

}
