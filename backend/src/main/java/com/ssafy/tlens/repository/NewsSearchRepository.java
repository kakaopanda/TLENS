package com.ssafy.tlens.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tlens.entity.rdbms.News;
import com.ssafy.tlens.entity.rdbms.QNews;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NewsSearchRepository {

    EntityManager em;
    JPAQueryFactory query = new JPAQueryFactory(em);
    QNews news = QNews.news;

    public List<News> findBySearch(String searchword, int pageNo, int pageSize) {

        return query
                .select(news)
                .from(news)
                .where(news.title.contains(searchword).or(news.summary.contains(searchword)))
                .orderBy(news.createdDate.desc())
                //offset 방식
                .limit(pageSize)
                .offset(pageNo * pageSize)
                .distinct()
                .fetch();
    }


    public List<News> findByCategory(String category, int pageNo, int pageSize) {

        return query
                .select(news)
                .from(news)
                .where(news.category.eq(category))
                .orderBy(news.createdDate.desc())
                //offset 방식
                .limit(pageSize)
                .offset(pageNo * pageSize)
                .distinct()
                .fetch();
    }

    public List<News> findByCategoryOnToday(String category, int pageNo, int pageSize) {

        return query
                .select(news)
                .from(news)
                .where(news.category.eq(category).and(isCreatedToday()))
                .orderBy(news.createdDate.desc())
                //offset 방식
                .limit(pageSize)
                .offset(pageNo * pageSize)
                .distinct()
                .fetch();
    }

    private BooleanExpression isCreatedToday() {
        LocalDateTime dateTime = LocalDateTime.now();
        // 현재시간에서 하루 전의 시간으로 세팅
        // 해당 시간 이후에 등록된 기사들만 조회
        return news.createdDate.after(dateTime.minusDays(1));
    }
}