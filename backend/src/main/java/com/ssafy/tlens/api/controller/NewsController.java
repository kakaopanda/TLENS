package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.service.NewsService;
import com.ssafy.tlens.common.model.response.HttpResponseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

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
        newsService.getNewsData();
        return success();
    }
}
