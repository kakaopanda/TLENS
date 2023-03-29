package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.response.ListAndCntResponseDTO;
import com.ssafy.tlens.api.response.NewsInfoDTO;
import com.ssafy.tlens.api.service.NewsService;
import com.ssafy.tlens.common.ResponseDto;
import com.ssafy.tlens.common.model.response.HttpResponseEntity;
import com.ssafy.tlens.enums.ResponseEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.ssafy.tlens.common.model.response.HttpResponseEntity.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableScheduling
@Configuration
public class NewsController {
    private final NewsService newsService;

    @Scheduled(cron = " * * * * * * ")
    public HttpResponseEntity.ResponseResult<?> insert() throws Exception {
        // newsService.getNewsData();
        return success();
    }

    @PostMapping("api/v1/news/search")
    public ResponseEntity<?> getNewsBySearch(@RequestParam String searchword) {
        List<NewsInfoDTO> result = newsService.getNewsBySearch(searchword);

        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.PRODUCT_SEARCH_SUCCESS, result), HttpStatus.OK);
    }
}
