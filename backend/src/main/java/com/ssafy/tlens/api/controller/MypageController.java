package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.response.UserInfoResponseDTO;
import com.ssafy.tlens.api.service.MypageService;
import com.ssafy.tlens.common.ResponseDto;
import com.ssafy.tlens.enums.ResponseEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mypage")
public class MypageController {

    private MypageService mypageService;

    @PostMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(@RequestParam Long id) {
        UserInfoResponseDTO result = mypageService.getUserInfo(id);

        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.USER_MY_INFO_SUCCESS, result), HttpStatus.OK);
    }

    @PostMapping("/keyword")
    public ResponseEntity<?> getUserKeyword(@RequestParam Long id) {
        List<String> result = mypageService.getUserKeyword(id);

        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.USER_MY_INFO_SUCCESS, result), HttpStatus.OK);
    }
}
