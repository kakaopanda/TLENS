package com.ssafy.tlens.api.crawler;

import com.ssafy.tlens.entity.rdbms.News;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.List;
import java.util.StringTokenizer;

public class Donga {
    public List<News> crawl() throws IOException {
        String targetURL = "https://rss.donga.com/total.xml";
        Document doc = Jsoup.connect(targetURL).get();
        Elements contents = doc.select("item");

        for(Element content : contents) {
            String category = "";
            String subject = content.select("title").text(); // 제목
            String cont = "";	  // 내용
            String reporter = ""; // 기자
            String picURL = "";	  // 사진 URL
            String press = "동아일보";
            String newsURL = content.select("link").text(); // 뉴스 URL
            String date = ""; // yyyy-mm-dd hh:mm:ss
            String modifiedAt = "";
            String createdAt = "";

            Document contentDoc = Jsoup.connect(newsURL).get();
            Elements newContents = contentDoc.select(".view_wrap");

            for(Element newContent : newContents) {
                category = newContent.select(".location").select("a").text();
                reporter = newContent.select(".report").select("a").text();
                cont = newContent.select(".article_txt").text().replaceAll("기사와 직접적인 관련 없는 자료 사진.","")
                        .replaceAll("자료사진.","").replaceAll("크게보기게티이미지뱅크","");
                picURL = newContent.select(".thumb").select("img").attr("abs:src");
                date = newContent.select(".title_foot").select(".date01").text().replaceAll("입력","")
                        .replaceAll("업데이트","");
            }
            StringTokenizer st = new StringTokenizer(date," ");
            modifiedAt = st.nextToken()+" "+st.nextToken();
            createdAt = st.nextToken()+" "+st.nextToken();
            if(reporter.equals("")){
                reporter = "동아일보";
            }
            reporter = reporter.replaceAll("기자","")
                    .replaceAll("동아닷컴","")
                    .replaceAll(" ","");

            System.out.println("press : "+press);
            System.out.println("category : "+category);
            System.out.println("title : "+subject);
            System.out.println("reporter : "+reporter);
            System.out.println("content : "+cont);
            System.out.println("thumbnail : "+picURL);
            System.out.println("URL : "+newsURL);
            System.out.println("modifiedAt : "+modifiedAt);
            System.out.println("createdAt : "+createdAt);
            System.out.println();

//            if(cont!="" && picURL!="" && newsURL!="") {
//                News news = News.builder()
//                        .subject(subject)
//                        .content(cont)
//                        .picURL(picURL)
//                        .newsURL(newsURL)
//                        .build();
//
//                newsList.add(news);
//            }
        }
        return null;
    }
}