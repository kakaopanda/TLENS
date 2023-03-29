package com.ssafy.tlens.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.tlens.entity.rdbms.News;
import com.ssafy.tlens.entity.rdbms.QNews;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NewsSearchRepository {

    private final EntityManager em;

    public List<News> findBySearch(String searchword) {
        JPAQueryFactory query = new JPAQueryFactory(em);
        QNews news = QNews.news;

        return query
                .select(news)
                .from(news)
                .where(news.title.contains(searchword).or(news.summary.contains(searchword)))
                .orderBy(news.createdDate.desc())
                .fetch();
    }
}
