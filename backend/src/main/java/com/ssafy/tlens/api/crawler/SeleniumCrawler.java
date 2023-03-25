package com.ssafy.tlens.api.crawler;

import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class SeleniumCrawler {
    // STEP1. 웹 드라이버(WebDriver) 객체 생성
    private WebDriver driver;

    // STEP2. 드라이버 속성(Properties) 지정
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:/selenium/chromedriver_win32/chromedriver.exe";

    // STEP3. 크롤링 할 URL 지정
    private String baseURL;

    public SeleniumCrawler(String URL) {
        super();

        // STEP4. 시스템 속성 설정(System Property SetUp)
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        // STEP5. 드라이버 옵션 설정(Driver SetUp)
        // PageLoadStrategy.NORMAL을 통해 페이지 로드가 완료된 시점에서 크롤링을 수행한다.
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--log-level=3");
        options.addArguments("--disable-loging");
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        driver = new ChromeDriver(options);
        baseURL = URL;
    }

    public String thumbCrawl() {
        try {
            // STEP6. URL Request
            driver.get(baseURL);
            WebElement element = driver.findElement(By.id("img1"));
            return element.getAttribute("src");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.close();
        }
        return null;
    }
}