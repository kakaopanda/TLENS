package com.ssafy.tlens.api.crawler;

import com.ssafy.tlens.entity.rdbms.News;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.List;

public class OhMyNews {
    public List<News> crawl() throws IOException {
        String targetURL = "https://rss.ohmynews.com/rss/politics.xml";
        Document doc = Jsoup.connect(targetURL).get();
        Elements contents = doc.select("item");

        for(Element content : contents) {
            String category = "";
            String subject = content.select("title").text();						// 제목
            String cont = "";							// 내용
            String picURL = "";			    // 사진URL
            String newsURL = content.select("link").text();				// 뉴스URL

            Document contentDoc = Jsoup.connect(newsURL).get();
            Elements newContents = contentDoc.select("#article");

            for(Element newContent : newContents){
                category = newContent.select(".t_stit").text();
                cont = newContent.select(".at_contents").text().replaceAll("큰사진보기","").replaceAll("▲","");
                picURL = newContent.select("tbody").select("img").attr("abs:src");
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