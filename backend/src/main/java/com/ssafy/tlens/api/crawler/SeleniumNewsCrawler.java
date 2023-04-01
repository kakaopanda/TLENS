package com.ssafy.tlens.api.crawler;

import com.ssafy.tlens.api.request.NewsRequestDTO;
import com.ssafy.tlens.entity.rdbms.News;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class SeleniumNewsCrawler {

    // STEP1. 웹 드라이버(WebDriver) 객체 생성
    private final WebDriver driver;

    // STEP2. 드라이버 속성(Properties) 지정
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:/selenium/chromedriver_win32/chromedriver.exe";

    // STEP3. 크롤링 할 URL 지정
    private final String recentPress;
    private final String baseURL;
    private final News news;
    private boolean flag = true;

    // STEP4. 크롤링한 뉴스 기사를 담을 리스트 객체 생성
    private List<NewsRequestDTO> list = new ArrayList<>();

    public SeleniumNewsCrawler(String recentPress, String URL, News news) {
        super();
        this.recentPress = recentPress;
        this.news = news;

        // STEP5. 시스템 속성 설정(System Property SetUp)
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        // STEP6. 드라이버 옵션 설정(Driver SetUp)
        // PageLoadStrategy.NORMAL을 통해 페이지 로드가 완료된 시점에서 크롤링을 수행한다.
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--log-level=3");
        options.addArguments("--disable-loging");
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = new ChromeDriver(options);
        baseURL = URL;
    }

    public List<NewsRequestDTO> dynamicCrawling(){
        try {
            // STEP7. oid 값에 각 언론사별 코드를 넣어준 다음, 각 언론사별 최신 기사 페이지로 이동한다.
            driver.get(baseURL);
            List<WebElement> elements;

            while(true){
                // STEP8. StaleElementReferenceException 예외를 방지하기 위해, 새로운 링크로 이동할 때마다 DOM을 갱신해줘야한다.
                elements = driver.findElements(By.cssSelector("ul.type06_headline > li"));

                // STEP9. 최신 기사 페이지에서 한 페이지당 작성된 기사 개수를 의미한다. (최대 10개)
                int articleCount = driver.findElements(By.cssSelector("ul.type06_headline > li")).size();
                String[] URL = new String[articleCount];
                int index = 0;
                int currentPage = Integer.parseInt(driver.findElement(By.cssSelector("#main_content > div.paging > strong")).getText());

                // STEP10. "다음" 버튼이 활성화되어 있는 경우 <a> 태그가 10개, 그렇지 않으면 10개 미만으로 구성된다.
                // STEP11. 첫 번째 페이지의 태그가 <strong> 태그가 아닌 <a> 태그로 분류될 경우 11개로 구성된다.
                List<WebElement> aElements = driver.findElements(By.cssSelector("div.paging > a"));
                int aCount = driver.findElements(By.cssSelector("div.paging > a")).size();

                // STEP12. "다음" 버튼이 활성화되어 있는 경우, 해당 링크를 미리 얻어둬야한다. (마지막 <a> 태그의 href)
                String bigNextURL = null;
                String smallNextURL = null;

                if(aCount >= 10){
                    for(WebElement element : aElements){
                        bigNextURL = element.getAttribute("href");
                    }
                }
                for(WebElement element : aElements){
                    if(element.getText().equals(Integer.toString(currentPage+1))){
                        smallNextURL = element.getAttribute("href");
                    }}

                // STEP13. 페이지의 초반부에 해당하는 최대 10개의 기사 링크를 담는다.
                for(WebElement element : elements){
                    URL[index++] = element.findElement(By.cssSelector("a")).getAttribute("href");
                }

                // STEP14. <a> 태그의 속성 href를 가져와서 해당 기사 링크로 재연결한다.
                for(int i=0; i<URL.length; i++){
                    // 크롤링 대상 기사의 정보를 담을 RequestDTO를 생성한다.
                    NewsRequestDTO newsRequestDTO = new NewsRequestDTO();
                    String title, reporter, press, region, category, enterprise, thumbNail, crawlLink, originalLink;
                    region = null;
                    enterprise = null;
                    LocalDateTime createdDate, modifiedDate;

                    try{
                        driver.navigate().to(URL[i]);
                    } catch(Exception e){
                        continue;
                    }
                    try{
                        // Case1. 일반적인 기사 페이지로 이동하는 경우
                        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("._ARTICLE_DATE_TIME")));
                        title = driver.findElement(By.cssSelector("#title_area > span")).getText();
                        press = recentPress;

                        // Case1-1. 기사를 작성한 기자가 명시되어 있지 않은 경우, 언론사로 대체한다.
                        try {
                            reporter = driver.findElement(By.cssSelector("div.media_end_head_journalist > a > em")).getText();
                        } catch(Exception e){
                            reporter = press;
                        }
                        category = driver.findElement(By.cssSelector(".media_end_categorize_item")).getText();

                        // Case1-2. 기사에 썸네일 이미지가 존재하지 않는 경우, 널값으로 대체한다.
                        try{
                            thumbNail = driver.findElement(By.id("img1")).getAttribute("src");
                        } catch(Exception e){
                            thumbNail = null;
                        }
                        crawlLink = URL[i];
                        try{
                            createdDate = transLocalDateTime(
                                    driver.findElement(
                                                    By.cssSelector("._ARTICLE_DATE_TIME"))
                                            .getAttribute("data-date-time")
                            );
                            // Case1-3. 크롤링한 기사의 작성일자가 RDBMS보다 먼저 작성된 경우 크롤링을 중단한다.
                            if(news.getCrawlLink().equals(crawlLink) || news.getCreatedDate().isEqual(createdDate) || news.getCreatedDate().isAfter(createdDate)){
                                flag = false;
                                break;
                            }
                        } catch(Exception e){
                            createdDate = transLocalDateTimeEntertainAndSport(
                                    driver.findElement(
                                                    By.cssSelector("._ARTICLE_DATE_TIME"))
                                            .getAttribute("data-date-time")
                            );
                        }
                        // Case1-4. 기사에 수정일자가 존재하지 않는 경우, 작성일자로 대체한다.
                        try{
                            modifiedDate = transLocalDateTime(
                                    driver.findElement(
                                                    By.cssSelector("._ARTICLE_MODIFY_DATE_TIME"))
                                            .getAttribute("data-modify-date-time")
                            );
                        } catch(Exception e){
                            modifiedDate = createdDate;
                        }

                        // Case1-5. 기사에 원문링크(언론사)가 존재하지 않는 경우 크롤링하지 않는다.
                        try{
                            originalLink = driver.findElement(By.cssSelector("div.media_end_head_info_datestamp > a")).getAttribute("href");
                        } catch(Exception e){
                            driver.navigate().back();
                            continue;
                        }
                        newsRequestDTO = constructDTO(title, reporter, press, region, category, enterprise,
                                thumbNail, crawlLink, originalLink, createdDate, modifiedDate);

                        list.add(newsRequestDTO);
                        driver.navigate().back();
                    } catch(TimeoutException e1){
                        try{
                            // Case2. 연예 기사 페이지로 리다이렉트 된 경우
                            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#content > div.end_ct > div > div.article_info > span:nth-child(1) > em")));
                            title = driver.findElement(By.cssSelector("div.end_ct > div > h2")).getText();
                            press = recentPress;

                            // Case2-1. 기사를 작성한 기자가 명시되어 있지 않은 경우, 언론사로 대체한다.
                            try {
                                reporter = driver.findElement(By.cssSelector("div.media_end_head_journalist > a > em")).getText();
                            } catch(Exception e){
                                reporter = press;
                            }
                            category = "연예";

                            // Case2-2. 기사에 썸네일 이미지가 존재하지 않는 경우, 널값으로 대체한다.
                            try{
                                thumbNail = driver.findElement(By.id("img1")).getAttribute("src");
                            } catch(Exception e){
                                thumbNail = null;
                            }
                            crawlLink = URL[i];
                            createdDate = transLocalDateTimeEntertainAndSport(
                                    getLocalDateTime(
                                            driver.findElement(
                                                            By.cssSelector("div.article_info > span > em"))
                                                    .getText()
                                    )
                            );

                            // Case2-3. 크롤링한 기사의 작성일자가 RDBMS보다 먼저 작성된 경우 크롤링을 중단한다.
                            if(news.getCrawlLink().equals(crawlLink) || news.getCreatedDate().isEqual(createdDate)
                                    || news.getCreatedDate().isAfter(createdDate)){
                                flag = false;
                                break;
                            }

                            // Case2-4. 기사에 수정일자가 존재하지 않는 경우, 작성일자로 대체한다.
                            try{
                                modifiedDate = transLocalDateTimeEntertainAndSport(
                                        getLocalDateTime(
                                                driver.findElement(
                                                                By.cssSelector("div.article_info > span:nth-child(2) > em"))
                                                        .getText()
                                        )
                                );
                            } catch(Exception e){
                                modifiedDate = createdDate;
                            }

                            // Case2-5. 기사에 원문링크(언론사)가 존재하지 않는 경우 크롤링하지 않는다.
                            try{
                                originalLink = driver.findElement(By.cssSelector("div.article_info > a")).getAttribute("href");
                            } catch(Exception e){
                                driver.navigate().back();
                                continue;
                            }
                            newsRequestDTO = constructDTO(title, reporter, press, region, category, enterprise,
                                    thumbNail, crawlLink, originalLink, createdDate, modifiedDate);

                            list.add(newsRequestDTO);
                            driver.navigate().back();
                        } catch(TimeoutException e2){
                            // Case3. 스포츠 기사 페이지로 리다이렉트 된 경우
                            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#content > div > div.content > div > div.news_headline > div > span:nth-child(1)")));
                            title = driver.findElement(By.cssSelector("div.news_headline > h4")).getText();
                            press = recentPress;

                            // Case3-1. 기사를 작성한 기자가 명시되어 있지 않은 경우, 언론사로 대체한다.
                            try {
                                reporter = driver.findElement(By.cssSelector("div.profile_info > a > div.name")).getText();
                            } catch(Exception e){
                                reporter = press;
                            }
                            category = "스포츠";

                            // Case3-2. 기사에 썸네일 이미지가 존재하지 않는 경우, 널값으로 대체한다.
                            try{
                                thumbNail = driver.findElement(By.cssSelector("#newsEndContents > span > img")).getAttribute("src");
                            } catch(Exception e){
                                thumbNail = null;
                            }
                            crawlLink = URL[i];
                            createdDate = transLocalDateTimeEntertainAndSport(
                                    getLocalDateTime(
                                            driver.findElement(
                                                            By.cssSelector("div.news_headline > div > span:nth-child(1)"))
                                                    .getText()
                                                    .replace("기사입력 ","")
                                    )
                            );
                            // Case3-3. 크롤링한 기사의 작성일자가 RDBMS보다 먼저 작성된 경우 크롤링을 중단한다.
                            if(news.getCrawlLink().equals(crawlLink) || news.getCreatedDate().isEqual(createdDate)
                                    || news.getCreatedDate().isAfter(createdDate)){
                                flag = false;
                                break;
                            }

                            // Case3-4. 기사에 수정일자가 존재하지 않는 경우, 작성일자로 대체한다.
                            try{
                                modifiedDate = transLocalDateTimeEntertainAndSport(
                                        getLocalDateTime(
                                                driver.findElement(
                                                                By.cssSelector("div.news_headline > div > span:nth-child(2) > span"))
                                                        .getText())
                                                .replace("최종수정 ","")
                                );
                            } catch(Exception e){
                                modifiedDate = createdDate;
                            }

                            // Case3-5. 기사에 원문링크(언론사)가 존재하지 않는 경우 크롤링하지 않는다.
                            try{
                                originalLink = driver.findElement(By.cssSelector("div.news_headline > div > a")).getAttribute("href");
                            } catch(Exception e){
                                driver.navigate().back();
                                continue;
                            }
                            newsRequestDTO = constructDTO(title, reporter, press, region, category, enterprise,
                                    thumbNail, crawlLink, originalLink, createdDate, modifiedDate);

                            list.add(newsRequestDTO);
                            driver.navigate().back();
                        }
                    }
                }

                // STEP8. StaleElementReferenceException 예외를 방지하기 위해, 새로운 링크로 이동할 때마다 DOM을 갱신해줘야한다.
                elements = driver.findElements(By.cssSelector("ul.type06 > li"));

                // STEP9. 최신 기사 페이지에서 한 페이지당 작성된 기사 개수를 의미한다. (초반부 + 후반부 = 최대 20개)
                articleCount = driver.findElements(By.cssSelector("ul.type06 > li")).size();
                URL = new String[articleCount];

                // STEP10. 페이지의 후반부에 해당하는 최대 10개의 기사 링크를 담는다.
                index = 0;
                for(WebElement element : elements){
                    URL[index++] = element.findElement(By.cssSelector("a")).getAttribute("href");
                }

                for(int i=0; i<URL.length; i++){
                    try{
                        driver.navigate().to(URL[i]);
                    } catch(Exception e){
                        continue;
                    }
                    // STEP11. 크롤링 대상 기사의 정보를 담을 RequestDTO를 생성한다.
                    NewsRequestDTO newsRequestDTO = new NewsRequestDTO();
                    String title, reporter, press, region, category, enterprise, thumbNail, crawlLink, originalLink;
                    region = null;
                    enterprise = null;
                    LocalDateTime createdDate, modifiedDate;

                    try{
                        driver.navigate().to(URL[i]);
                    } catch(Exception e){
                        continue;
                    }
                    try{
                        // Case1. 일반적인 기사 페이지로 이동하는 경우
                        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("._ARTICLE_DATE_TIME")));
                        title = driver.findElement(By.cssSelector("#title_area > span")).getText();
                        press = recentPress;

                        // Case1-1. 기사를 작성한 기자가 명시되어 있지 않은 경우, 언론사로 대체한다.
                        try {
                            reporter = driver.findElement(By.cssSelector("div.media_end_head_journalist > a > em")).getText();
                        } catch(Exception e){
                            reporter = press;
                        }
                        category = driver.findElement(By.cssSelector(".media_end_categorize_item")).getText();

                        // Case1-2. 기사에 썸네일 이미지가 존재하지 않는 경우, 널값으로 대체한다.
                        try{
                            thumbNail = driver.findElement(By.id("img1")).getAttribute("src");
                        } catch(Exception e){
                            thumbNail = null;
                        }
                        crawlLink = URL[i];
                        try{
                            createdDate = transLocalDateTime(
                                    driver.findElement(
                                                    By.cssSelector("._ARTICLE_DATE_TIME"))
                                            .getAttribute("data-date-time")
                            );
                            // Case1-3. 크롤링한 기사의 작성일자가 RDBMS보다 먼저 작성된 경우 크롤링을 중단한다.
                            if(news.getCrawlLink().equals(crawlLink) || news.getCreatedDate().isEqual(createdDate)
                                    || news.getCreatedDate().isAfter(createdDate)){
                                flag = false;
                                break;
                            }
                        } catch(Exception e){
                            createdDate = transLocalDateTimeEntertainAndSport(
                                    driver.findElement(
                                                    By.cssSelector("._ARTICLE_DATE_TIME"))
                                            .getAttribute("data-date-time")
                            );
                        }

                        // Case1-4. 기사에 수정일자가 존재하지 않는 경우, 작성일자로 대체한다.
                        try{
                            modifiedDate = transLocalDateTime(
                                    driver.findElement(
                                                    By.cssSelector("._ARTICLE_MODIFY_DATE_TIME"))
                                            .getAttribute("data-modify-date-time")
                            );
                        } catch(Exception e){
                            modifiedDate = createdDate;
                        }
                        // Case1-5. 기사에 원문링크(언론사)가 존재하지 않는 경우 크롤링하지 않는다.
                        try{
                            originalLink = driver.findElement(By.cssSelector("div.media_end_head_info_datestamp > a")).getAttribute("href");
                        } catch(Exception e){
                            driver.navigate().back();
                            continue;
                        }
                        newsRequestDTO = constructDTO(title, reporter, press, region, category, enterprise,
                                thumbNail, crawlLink, originalLink, createdDate, modifiedDate);

                        list.add(newsRequestDTO);
                        driver.navigate().back();
                    } catch(TimeoutException e1){
                        try{
                            // Case2. 연예 기사 페이지로 리다이렉트 된 경우
                            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#content > div.end_ct > div > div.article_info > span:nth-child(1) > em")));
                            title = driver.findElement(By.cssSelector("div.end_ct > div > h2")).getText();
                            press = recentPress;

                            // Case2-1. 기사를 작성한 기자가 명시되어 있지 않은 경우, 언론사로 대체한다.
                            try {
                                reporter = driver.findElement(By.cssSelector("div.media_end_head_journalist > a > em")).getText();
                            } catch(Exception e){
                                reporter = press;
                            }
                            category = "연예";

                            // Case2-2. 기사에 썸네일 이미지가 존재하지 않는 경우, 널값으로 대체한다.
                            try{
                                thumbNail = driver.findElement(By.id("img1")).getAttribute("src");
                            } catch(Exception e){
                                thumbNail = null;
                            }
                            crawlLink = URL[i];
                            createdDate = transLocalDateTimeEntertainAndSport(
                                    getLocalDateTime(
                                            driver.findElement(
                                                            By.cssSelector("div.article_info > span > em"))
                                                    .getText()
                                    )
                            );
                            // Case2-3. 크롤링한 기사의 작성일자가 RDBMS보다 먼저 작성된 경우 크롤링을 중단한다.
                            if(news.getCrawlLink().equals(crawlLink) || news.getCreatedDate().isEqual(createdDate)
                                    || news.getCreatedDate().isAfter(createdDate)){
                                flag = false;
                                break;
                            }

                            // Case2-4. 기사에 수정일자가 존재하지 않는 경우, 작성일자로 대체한다.
                            try{
                                modifiedDate = transLocalDateTimeEntertainAndSport(
                                        getLocalDateTime(
                                                driver.findElement(
                                                                By.cssSelector("div.article_info > span:nth-child(2) > em"))
                                                        .getText()
                                        )
                                );
                            } catch(Exception e){
                                modifiedDate = createdDate;
                            }

                            // Case2-5. 기사에 원문링크(언론사)가 존재하지 않는 경우 크롤링하지 않는다.
                            try{
                                originalLink = driver.findElement(By.cssSelector("div.article_info > a")).getAttribute("href");
                            } catch(Exception e){
                                driver.navigate().back();
                                continue;
                            }
                            newsRequestDTO = constructDTO(title, reporter, press, region, category, enterprise,
                                    thumbNail, crawlLink, originalLink, createdDate, modifiedDate);

                            list.add(newsRequestDTO);
                            driver.navigate().back();
                        } catch(TimeoutException e2){
                            // Case3. 스포츠 기사 페이지로 리다이렉트 된 경우
                            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#content > div > div.content > div > div.news_headline > div > span:nth-child(1)")));
                            title = driver.findElement(By.cssSelector("div.news_headline > h4")).getText();
                            press = recentPress;

                            // Case3-1. 기사를 작성한 기자가 명시되어 있지 않은 경우, 언론사로 대체한다.
                            try {
                                reporter = driver.findElement(By.cssSelector("div.profile_info > a > div.name")).getText();
                            } catch(Exception e){
                                reporter = press;
                            }
                            category = "스포츠";

                            // Case3-2. 기사에 썸네일 이미지가 존재하지 않는 경우, 널값으로 대체한다.
                            try{
                                thumbNail = driver.findElement(By.cssSelector("#newsEndContents > span > img")).getAttribute("src");
                            } catch(Exception e){
                                thumbNail = null;
                            }
                            crawlLink = URL[i];
                            createdDate = transLocalDateTimeEntertainAndSport(
                                    getLocalDateTime(
                                            driver.findElement(
                                                            By.cssSelector("div.news_headline > div > span:nth-child(1)"))
                                                    .getText()
                                                    .replace("기사입력 ","")
                                    )
                            );
                            // Case3-3. 크롤링한 기사의 작성일자가 RDBMS보다 먼저 작성된 경우 크롤링을 중단한다.
                            if(news.getCrawlLink().equals(crawlLink) || news.getCreatedDate().isEqual(createdDate)
                                    || news.getCreatedDate().isAfter(createdDate)){
                                flag = false;
                                break;
                            }

                            // Case3-4. 기사에 수정일자가 존재하지 않는 경우, 작성일자로 대체한다.
                            try{
                                modifiedDate = transLocalDateTimeEntertainAndSport(
                                        getLocalDateTime(
                                                driver.findElement(
                                                                By.cssSelector("div.news_headline > div > span:nth-child(2) > span"))
                                                        .getText()
                                                        .replace("최종수정 ","")
                                        )
                                );
                            } catch(Exception e){
                                modifiedDate = createdDate;
                            }

                            // Case3-5. 기사에 원문링크(언론사)가 존재하지 않는 경우 크롤링하지 않는다.
                            try{
                                originalLink = driver.findElement(By.cssSelector("div.news_headline > div > a")).getAttribute("href");
                            } catch(Exception e){
                                driver.navigate().back();
                                continue;
                            }
                            newsRequestDTO = constructDTO(title, reporter, press, region, category, enterprise,
                                    thumbNail, crawlLink, originalLink, createdDate, modifiedDate);

                            list.add(newsRequestDTO);
                            driver.navigate().back();
                        }
                    }
                }

                if(flag){
                    if((currentPage % 10) != 0){
                        if(smallNextURL!=null){
                            driver.navigate().to(smallNextURL);
                            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("ul.type06_headline > li")));
                            currentPage++;
                            continue;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        if(bigNextURL != null){
                            driver.navigate().to(bigNextURL);
                            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
                            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("ul.type06_headline > li")));
                        }
                        else{
                            break;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.close();
            return list;
        }
    }

    public String getLocalDateTime(String data){
        // 작성일자 혹은 수정일자가 존재하지 않는 경우 변환을 취소한다.
        if(data.length()==0){
            return null;
        }
        else{
            int year, month, day, hour, minute;
            year = Integer.parseInt(data.substring(0,4));
            month = Integer.parseInt(data.substring(5,7));
            day = Integer.parseInt(data.substring(8,10));
            String dayNight = data.substring(12,14);

            // Case1. 시간이 0시~9시 사이인 경우
            if(data.length()==19){
                hour = Integer.parseInt(data.substring(15,16));
                minute = Integer.parseInt(data.substring(17,19));
            }
            // Case2. 시간이 10시~12시 사이인 경우
            else if(data.length()==20){
                hour = Integer.parseInt(data.substring(15,17));
                minute = Integer.parseInt(data.substring(18,20));
            }
            else{
                hour = 0;
                minute = 0;
            }
            if(dayNight.equals("오후")){
                if(hour != 12){
                    hour += 12;
                }
            }
            LocalDateTime ldt = LocalDateTime.of(
                    year, month, day, hour, minute
            );
            String date = ldt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

            return date;
        }
    }

    // 2023-03-29 12:50:15
    // (String -> yyyy-MM-dd HH:mm:ss) -> (LocalDateTime)
    public LocalDateTime transLocalDateTime(String data){
        int year, month, day, hour, minute, second;
        year = Integer.parseInt(data.substring(0,4));
        month = Integer.parseInt(data.substring(5,7));
        day = Integer.parseInt(data.substring(8,10));
        hour = Integer.parseInt(data.substring(11,13));
        minute = Integer.parseInt(data.substring(14,16));
        second = Integer.parseInt(data.substring(17,19));

        LocalDateTime ldt = LocalDateTime.of(
                year, month, day, hour, minute, second
        );
        return ldt;
    }

    // 2023-03-29 12:50
    // (String -> yyyy-MM-dd HH:mm) -> (LocalDateTime)
    public LocalDateTime transLocalDateTimeEntertainAndSport(String data){
        int year, month, day, hour, minute, second;
        year = Integer.parseInt(data.substring(0,4));
        month = Integer.parseInt(data.substring(5,7));
        day = Integer.parseInt(data.substring(8,10));
        hour = Integer.parseInt(data.substring(11,13));
        minute = Integer.parseInt(data.substring(14,16));

        LocalDateTime ldt = LocalDateTime.of(
                year, month, day, hour, minute
        );
        return ldt;
    }

    public NewsRequestDTO constructDTO(String title, String reporter, String press, String region,
                                       String category, String enterprise, String thumbNail, String crawlLink,
                                       String originalLink, LocalDateTime createdDate, LocalDateTime modifiedDate){
        NewsRequestDTO newsRequestDTO = new NewsRequestDTO();

        newsRequestDTO.setTitle(title);
        newsRequestDTO.setReporter(reporter);
        newsRequestDTO.setPress(press);
        newsRequestDTO.setRegion(region);
        newsRequestDTO.setCategory(category);
        newsRequestDTO.setEnterprise(enterprise);
        newsRequestDTO.setThumbNail(thumbNail);
        newsRequestDTO.setCrawlLink(crawlLink);
        newsRequestDTO.setOriginalLink(originalLink);
        newsRequestDTO.setCreatedDate(createdDate);
        newsRequestDTO.setModifiedDate(modifiedDate);

        return newsRequestDTO;
    }
}