package com.ssafy.tlens.api.crawler;

import com.ssafy.tlens.entity.rdbms.News;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.List;

public class Hani {
    public List<News> crawl() throws IOException {
        String targetURL = "https://www.hani.co.kr/rss/";
        Document doc = Jsoup.connect(targetURL).get();
        Elements contents = doc.select("item");

        for(Element content : contents) {
            String category = "";
            String subject = content.select("title").text();						// 제목
            String cont = "";							// 내용
            String picURL = "";			    // 사진URL
            String newsURL = content.select("link").text();				// 뉴스URL

            Document contentDoc = Jsoup.connect(newsURL).get();
            Elements newContents = contentDoc.select("#contents-article");

            for(Element newContent : newContents){
                category = newContent.select(".category").select("a").text();
                cont = newContent.select(".text").text().replaceAll("▲","");
                picURL = newContent.select(".image").select("img").attr("abs:src");
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