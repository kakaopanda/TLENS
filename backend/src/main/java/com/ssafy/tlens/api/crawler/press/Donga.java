package com.ssafy.tlens.api.crawler.press;

import com.ssafy.tlens.entity.rdbms.News;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

// [완료] 동아일보는 한번에 50개의 기사를 크롤링한다.
public class Donga {
    public static void main(String[] args) throws IOException{
        crawl();
    }

    public static List<News> crawl() throws IOException {
        List<News> newsList = new ArrayList<>();
        String targetURL = "https://rss.donga.com/total.xml";
        Document doc = Jsoup.connect(targetURL).get();
        Elements contents = doc.select("item");

        for(Element content : contents) {
            Long newsId; // 기사 ID(Auto Increment)
            String title = content.select("title").text(); // 기사 제목
            String summary = ""; // 기사 내용요약
            String cont = ""; // 기사 내용(RDBMS에는 포함되지 않는 필드)
            String reporter = ""; // 기자
            String press = "동아일보"; // 언론사
            String region = ""; // 지역
            String category = ""; // 분야
            String enterprise = ""; // 기업
            String thumbNail = ""; // 썸네일 이미지 링크
            String link = content.select("link").text(); // 뉴스 본문 링크
            String date = ""; // 작성일자 및 수정일자 전처리를 위해 필요한 추가 필드
            String createdDate = ""; // 기사 작성 시각
            String modifiedDate = ""; // 기사 수정 시각

            Document contentDoc = Jsoup.connect(link).get();
            Elements newContents = contentDoc.select(".view_wrap");

            for(Element newContent : newContents) {
                category = newContent.select(".location").select("a").text();
                reporter = newContent.select(".report").select("a").text();
                cont = newContent.select(".article_txt").text().replaceAll("기사와 직접적인 관련 없는 자료 사진.","")
                        .replaceAll("자료사진.","").replaceAll("크게보기게티이미지뱅크","");
                thumbNail = newContent.select(".thumb").select("img").attr("abs:src");
                date = newContent.select(".title_foot").select(".date01").text().replaceAll("입력","")
                        .replaceAll("업데이트","");
            }
            StringTokenizer st = new StringTokenizer(date," ");
            createdDate = st.nextToken()+" "+st.nextToken();
            if(st.hasMoreTokens()){
                modifiedDate = st.nextToken()+" "+st.nextToken();
            }
            else{
                modifiedDate = "";
            }
            if(reporter.equals("")){
                reporter = "동아일보";
            }
            reporter = reporter.replaceAll("기자","")
                    .replaceAll("동아닷컴","")
                    .replaceAll(" ","");

            if(title!="" && link!="" && date!="") {
                LocalDateTime cldt = getLocalDateTime(createdDate);
                LocalDateTime mldt = null;
                if(!modifiedDate.equals("")){
                    mldt = getLocalDateTime(modifiedDate);
                }

                News news = News.builder()
                        .title(title)
                        .summary(summary)
                        .reporter(reporter)
                        .press(press)
                        .region(region)
                        .category(category)
                        .enterprise(enterprise)
                        .thumbNail(thumbNail)
                        .link(link)
                        .createdDate(cldt)
                        .modifiedDate(mldt)
                        .build();

                System.out.println(news+", createdDate="+cldt+", modifiedDate="+mldt);
                System.out.println(cont);
                newsList.add(news);
            }
        }
        return newsList;
    }

    public static LocalDateTime getLocalDateTime(String data){
        LocalDateTime ldt = LocalDateTime.of(
                Integer.parseInt(data.substring(0,4)),
                Integer.parseInt(data.substring(5,7)),
                Integer.parseInt(data.substring(8,10)),
                Integer.parseInt(data.substring(11,13)),
                Integer.parseInt(data.substring(14,16))
        );
        return ldt;
    }
}