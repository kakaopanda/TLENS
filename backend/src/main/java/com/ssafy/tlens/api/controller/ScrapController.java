package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.ScrapRequestDTO;
import com.ssafy.tlens.api.response.ListAndCntResponseDTO;
import com.ssafy.tlens.api.response.NewsInfoDTO;
import com.ssafy.tlens.api.service.ScrapService;
import com.ssafy.tlens.common.ResponseDto;
import com.ssafy.tlens.common.model.response.HttpResponseEntity.ResponseResult;
import com.ssafy.tlens.enums.ResponseEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static com.ssafy.tlens.common.model.response.HttpResponseEntity.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/scrap")
public class ScrapController {

    private final ScrapService scrapService;

    @PostMapping
    public ResponseResult<?> insert(@RequestBody @Valid ScrapRequestDTO scrapRequestDTO) throws Exception {
        scrapService.insert(scrapRequestDTO);
        return success();
    }

    @DeleteMapping
    public ResponseResult<?> delete(@RequestBody @Valid ScrapRequestDTO scrapRequestDTO) {
        scrapService.delete(scrapRequestDTO);
        return success();
    }

    @GetMapping("/news")
    public ResponseEntity<?> getScrapNewsList(@RequestParam Long userId) {
        ListAndCntResponseDTO result = scrapService.getScrapNewsList(userId);

        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.USER_MY_INFO_SUCCESS, result), HttpStatus.OK);
    }
}