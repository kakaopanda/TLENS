package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.crawler.JsoupCrawler;
import com.ssafy.tlens.api.crawler.press.*;
import com.ssafy.tlens.api.request.NewsCrawlRequestDTO;
import com.ssafy.tlens.entity.rdbms.News;
import com.ssafy.tlens.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final Chosun chosun = new Chosun(); // 조선일보
    private final Donga donga = new Donga(); // 동아일보
    private final Hani hani = new Hani(); // 한겨레
    private final Khan khan = new Khan(); // 경향신문
    private final OhMyNews ohMyNews = new OhMyNews(); // 오마이뉴스

    private final NewsRepository newsRepository;
    private final JsoupCrawler jsoupCrawler = new JsoupCrawler();
    private final String baseURL = "https://n.news.naver.com/mnews/article";
    private final String[] press = {
            "32", // 경향신문
            "81", // 서울신문
            "28", // 한겨레
            "5", // 국민일보
            "22", // 세계일보
            "469", // 한국일보
            "20", // 동아일보
            "23", // 조선일보
            "21", // 문화일보
            "25", // 중앙일보
            "421", // 뉴스1
            "449", // 채널A
            "214", // MBC
            "448", // TV조선
            "3", // 뉴시스
            "4", // 한국경제TV
            "57", // MBN
            "52", // YTN
            "1", // 연합뉴스
            "437", // JTBC
            "55", // SBS
            "422", // 연합뉴스TV
            "56", // KBS
            "374", // SBS Biz
    };

    // 조선일보, 동아일보, 한겨레, 경향신문, 오마이뉴스의 전체 기사를 크롤링한다.
    @Override
    public void getNewsData() throws IOException {
        // 크롤링한 전체 기사를 담는 List 배열
        // List<News> newsList = new ArrayList<>();
        NewsCrawlRequestDTO newsDto = jsoupCrawler.newsCrawl(
                baseURL + "/"+"001"+"/0013837852"
        );
        News news = News.builder()
                .title(newsDto.getTitle())
                .summary(newsDto.getSummary())
                .reporter(newsDto.getReporter())
                .press(newsDto.getPress())
                .region(newsDto.getRegion())
                .category(newsDto.getCategory())
                .enterprise(newsDto.getEnterprise())
                .thumbNail(newsDto.getThumbNail())
                .link(newsDto.getLink())
                .build();

        newsRepository.save(news);
    }
}
