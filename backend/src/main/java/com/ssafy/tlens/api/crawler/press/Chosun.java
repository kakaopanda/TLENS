package com.ssafy.tlens.api.crawler.press;

import com.ssafy.tlens.entity.rdbms.News;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Chosun {
    public List<News> crawl() throws IOException, ParseException, java.text.ParseException {

        List<News> newsList = new ArrayList<>();

        Document doc = null;
        // 조선일보 최신기사 RSS 피드
        doc = Jsoup.connect("https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml").get();

        // CSS Selector를 이용하여 기사 가져오기
        Elements newsContent = doc.select("channel > item");

        // 전체 기사 목록에서 기사 내용 가져와서 피용한 정보만 추출
        for (Element e : newsContent) {
            // 기사 제목
            String title = e.getElementsByTag("title").text();
            // 기사 작성 일자
            String date = e.getElementsByTag("pubDate").text();
            // 기사 링크
            String link = e.getElementsByTag("link").text();
            // 작성 기자
            String reporter = e.getElementsByTag("dc:creator").text().replaceAll(" 기자", "");

            if (!"https://www.chosun.com".equals(link)) {
                // 기사 링크를 통해 기사 원문 접근
                Document articleDom = Jsoup.connect(link).get();
                // SPA 페이지이기 때문에 기사를 가져오기 위해서 <script> tag를 문자열로 변환
                String articleInfo = articleDom.select("head > script").first().toString();

                //date String convert to LocalDateTime
                date = date.substring(5, 25);
                DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm:ss", Locale.ENGLISH);
                LocalDateTime dateTime = LocalDateTime.parse(date, format);

                //section 추출
                int sectionsStartIndex = articleInfo.indexOf("sections");
                int sectionsEndIndex = articleInfo.indexOf("\";", sectionsStartIndex);
                String sections = articleInfo.substring(sectionsStartIndex, sectionsEndIndex + 1);
                int sectionStartIndex = sections.indexOf("\"");
                int sectionEndIndex = sections.indexOf("\"", sectionStartIndex + 1);
                String section = sections.substring(sectionStartIndex + 1, sectionEndIndex);

                //thumbnail url과 content 추출
                String article = articleDom.getElementById("fusion-metadata").toString();
                int articleStartIndex = article.indexOf("Fusion.globalContent=");
                int articleEndIndex = article.indexOf("Fusion.globalContentConfig=");
                String content = article.substring(articleStartIndex, articleEndIndex);
                int contentStartIndex = content.indexOf("{");
                int contentEndIndex = content.lastIndexOf(";");
                JSONParser jsonParser = new JSONParser();
                JSONObject articleJson = (JSONObject) jsonParser.parse(content.substring(contentStartIndex, contentEndIndex));
                JSONArray contentJson = (JSONArray) articleJson.get("content_elements");
                String imageUrl = "";
                StringBuilder articleText = new StringBuilder();
                for (int i = 0; i < contentJson.size(); i++) {
                    JSONObject object = (JSONObject) contentJson.get(i);
                    if ("image".equals(object.get("type")) && "".equals(imageUrl)) {
                        imageUrl = (String) object.get("url");
                    } else if ("text".equals(object.get("type"))) {
                        String subText = (String) object.get("content");
                        int tagStartIndex = subText.indexOf("<");
                        int tagEndIndex = subText.indexOf(">");
                        if (tagStartIndex != -1) {
                            articleText.append(subText.substring(0, tagStartIndex));
                            articleText.append(subText.substring(tagEndIndex + 1));
                        } else {
                            articleText.append(subText);
                        }
                    }
                }
                News news = News.builder()
                        .title(title)
                        .createdDate(dateTime)
                        .thumbNail(imageUrl)
                        .summary(content)
                        .reporter(reporter)
                        .category(section)
                        .build();
                newsList.add(news);
            }
        }
        return newsList;
    }
}