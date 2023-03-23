package com.ssafy.tlens.api.crawler;

import com.ssafy.tlens.entity.rdbms.News;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.List;

public class Chosun {
    public List<News> crawl() throws IOException {
        String targetURL = "https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml";
        Document doc = Jsoup.connect(targetURL).get();
        Elements contents = doc.select("item");

        for(Element content : contents) {
            String category = "";
            String subject = content.select("title").text();						// 제목
            String cont = "";							// 내용
            String picURL = "";			    // 사진URL
            String newsURL = content.select("link").text();				// 뉴스URL

            Document contentDoc = Jsoup.connect(newsURL).get();
            Elements newContents = contentDoc.select(".box--display-block cover");

            for(Element newContent : newContents){
                category = newContent.select(".location").select("a").text();
                cont = newContent.select(".article_txt").text().replaceAll("기사와 직접적인 관련 없는 자료 사진.","")
                        .replaceAll("자료사진.","").replaceAll("크게보기게티이미지뱅크","");
                picURL = newContent.select(".lazyload-wrapper ").select("img").attr("abs:src");
            }

            System.out.println("category : "+category);
            System.out.println("title : "+subject);
            System.out.println("content : "+cont);
            System.out.println("thumbnail : "+picURL);
            System.out.println("URL : "+newsURL);
            System.out.println();
        }
        return null;
    }
}