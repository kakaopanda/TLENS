package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.crawler.press.*;
import com.ssafy.tlens.entity.rdbms.News;
import com.ssafy.tlens.repository.NewsRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class NewsServiceImpl implements NewsService {
    private final Chosun chosun = new Chosun(); // 조선일보
    private final Donga donga = new Donga(); // 동아일보
    private final Hani hani = new Hani(); // 한겨레
    private final Khan khan = new Khan(); // 경향신문
    private final OhMyNews ohMyNews = new OhMyNews(); // 오마이뉴스

    private final NewsRepository newsRepository;

    public NewsServiceImpl(NewsRepository newsRepository){
        this.newsRepository = newsRepository;
    }

    // 조선일보, 동아일보, 한겨레, 경향신문, 오마이뉴스의 전체 기사를 크롤링한다.
    @Override
    public List<News> getNewsData() throws IOException {
        // 크롤링한 전체 기사를 담는 List 배열
        List<News> newsList = new ArrayList<>();
        //newsList.addAll(chosun.crawl());
        //newsList.addAll(donga.crawl());
        //newsList.addAll(hani.crawl());
        //newsList.addAll(khan.crawl());
        //newsList.addAll(ohMyNews.crawl());

        return newsList;
    }
}
