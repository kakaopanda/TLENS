package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.crawler.SeleniumCrawler;
import com.ssafy.tlens.api.request.NewsRequestDTO;
import com.ssafy.tlens.api.response.ListAndCntResponseDTO;
import com.ssafy.tlens.api.response.NewsInfoDTO;
import com.ssafy.tlens.api.service.NewsService;
import com.ssafy.tlens.common.ResponseDto;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.common.model.response.HttpResponseEntity;
import com.ssafy.tlens.entity.rdbms.News;
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

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.tlens.common.model.response.HttpResponseEntity.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@EnableScheduling
@Configuration
public class NewsController {
    private final NewsService newsService;

//    TV조선 -> JTBC -> SBS Biz
//    private static String[][] test = {{"437", "448", "374"},{"JTBC", "TV조선", "SBS Biz"}};

    // 언론사별 URL 코드번호 배열(네이버)
    private final String[][] press = {
            {
                    "032", // 경향신문
                    "081", // 서울신문
                    "028", // 한겨레
                    "005", // 국민일보
                    "022", // 세계일보
                    "469", // 한국일보
                    "020", // 동아일보
                    "023", // 조선일보
                    "021", // 문화일보
                    "025", // 중앙일보
                    "421", // 뉴스1
                    "449", // 채널A
                    "214", // MBC
                    "448", // TV조선
                    "003", // 뉴시스
                    "004", // 한국경제TV
                    "057", // MBN
                    "052", // YTN
                    "001", // 연합뉴스
                    "437", // JTBC
                    "055", // SBS
                    "422", // 연합뉴스TV
                    "056", // KBS
                    "374", // SBS Biz
            },
            {
                    "경향신문",
                    "서울신문",
                    "한겨레",
                    "국민일보",
                    "세계일보",
                    "한국일보",
                    "동아일보",
                    "조선일보",
                    "문화일보",
                    "중앙일보",
                    "뉴스1",
                    "채널A",
                    "MBC",
                    "TV조선",
                    "뉴시스",
                    "한국경제TV",
                    "MBN",
                    "YTN",
                    "연합뉴스",
                    "JTBC",
                    "SBS",
                    "연합뉴스TV",
                    "KBS",
                    "SBS Biz",
            }
    };

    private String baseURL = "https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&oid=";

    // 5분마다 실시간 기사 크롤링을 수행한다.
    // @Scheduled(cron = "*/5 * * * * *")
    public HttpResponseEntity.ResponseResult<?> insert() throws Exception {
        // 전체 언론사를 대상으로 최근 뉴스 기사를 크롤링한다.
        for(int i=0; i<press[0].length; i++){
            // RDBMS상에서 존재하는 기등록된 기사와 크롤링된 기사의 작성시점은 크롤러에서 비교한다.
            News registNews = null;

            // RDBMS상에서 해당 언론사에 대해 기등록된 기사가 없을 경우, 샘플 데이터와의 비교를 통해 모든 데이터를 등록한다.
            try{
                registNews = newsService.getRecentData(press[1][i]);
                // System.out.println("○ "+registNews);
            } catch(NotFoundException e){
                registNews = News.builder()
                        .title("Compare Data")
                        .crawlLink("Compare Data")
                        .createdDate(LocalDateTime.of(1900,1,1,0,0))
                        .modifiedDate(LocalDateTime.of(1900,1,1,0,0))
                        .build();
            }

            // 크롤러는 1개의 언론사를 대상으로 크롤링을 수행한다.
            SeleniumCrawler sc = new SeleniumCrawler(press[1][i], baseURL + press[0][i], registNews);

            // 크롤러는 1개의 언론사에서 작성된 전체 최근 기사 목록을 반환한다.
            // 크롤러는 크롤링한 기사와 RDBMS상의 최근 기사의 작성일자를 비교하여 크롤링 진행 여부를 결정한다.
            List<NewsRequestDTO> list = sc.dynamicCrawling();

            // 크롤링한 기사를 RDBMS에 등록한다.
            for(int j=0; j<list.size(); j++){
                try{
                    newsService.insert(list.get(j));
                } catch(Exception e){
                    System.out.println(press[0][i] + press[1][i] + "동시성 문제로 중복된 기사는 등록하지 않습니다.");
                    continue;
                }
            }
        }
        return success();
    }

    @GetMapping("api/v1/news/search")
    public ResponseEntity<?> getNewsBySearch(@RequestParam String searchword) {
        List<NewsInfoDTO> result = newsService.getNewsBySearch(searchword);

        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.PRODUCT_SEARCH_SUCCESS, result), HttpStatus.OK);
    }

    @GetMapping("recent")
    public HttpResponseEntity.ResponseResult<?> recent(String press) throws Exception {
        LocalDateTime ldt = LocalDateTime.now();
        System.out.println(newsService.getRecentData(press).getCreatedDate());
        System.out.println(ldt.isAfter(newsService.getRecentData(press).getCreatedDate()));
        System.out.println(newsService.getRecentData(press).getCreatedDate().isAfter(ldt));

        return success();
    }

    @GetMapping("crawl")
    public HttpResponseEntity.ResponseResult<?> test() throws Exception {
        // 전체 언론사를 대상으로 최근 뉴스 기사를 크롤링한다.
        for(int i=0; i<press[0].length; i++){
            // RDBMS상에서 존재하는 기등록된 기사와 크롤링된 기사의 작성시점은 크롤러에서 비교한다.
            News registNews = null;

            // RDBMS상에서 해당 언론사에 대해 기등록된 기사가 없을 경우, 샘플 데이터와의 비교를 통해 모든 데이터를 등록한다.
            try{
                registNews = newsService.getRecentData(press[1][i]);
                // System.out.println("○ "+registNews);
            } catch(NotFoundException e){
                registNews = News.builder()
                        .title("Compare Data")
                        .crawlLink("Compare Data")
                        .createdDate(LocalDateTime.of(1900,1,1,0,0))
                        .modifiedDate(LocalDateTime.of(1900,1,1,0,0))
                        .build();
            }

            // 크롤러는 1개의 언론사를 대상으로 크롤링을 수행한다.
            SeleniumCrawler sc = new SeleniumCrawler(press[1][i], baseURL + press[0][i], registNews);

            // 크롤러는 1개의 언론사에서 작성된 전체 최근 기사 목록을 반환한다.
            // 크롤러는 크롤링한 기사와 RDBMS상의 최근 기사의 작성일자를 비교하여 크롤링 진행 여부를 결정한다.
            List<NewsRequestDTO> list = sc.dynamicCrawling();

            // 크롤링한 기사를 RDBMS에 등록한다.
            for(int j=0; j<list.size(); j++){
                try{
                    newsService.insert(list.get(j));
                } catch(Exception e){
                    System.out.println(press[0][i] + press[1][i] + "동시성 문제로 중복된 기사는 등록하지 않습니다.");
                    continue;
                }
            }
        }
        return success();
    }
}
