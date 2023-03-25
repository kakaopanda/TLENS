package com.ssafy.tlens.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsCrawlRequestDTO {
    String title; // 기사 제목
    String summary; // 기사 내용요약/
    String cont; // 기사 내용(RDBMS에는 포함되지 않는 필드)
    String reporter; // 기자
    String press; // 언론사
    String region; // 지역
    String category;// 분야
    String enterprise;// 기업
    String thumbNail;// 썸네일 이미지 링크
    String link; // 뉴스 본문 링크
    String createdDate; // 기사 작성 시각
    String modifiedDate; // 기사 수정 시각

    @Override
    public String toString() {
        return "NewsCrawlRequestDTO{" +
                " title(제목) = " + title +
                " summary(요약) = " + summary +
                " cont(기사본문) = " + cont +
                " reporter(기자) = " + reporter +
                " press(언론사) = " + press +
                " region(지역) = " + region +
                " category(분야) = " + category +
                " enterprise(기업) = " + enterprise +
                " thumbNail(썸네일) = " + thumbNail +
                " link(원문링크) = " + link +
                " createdDate(작성일자) = " + createdDate +
                " modifiedDate(수정일자) = " + modifiedDate +
                '}';
    }
}
