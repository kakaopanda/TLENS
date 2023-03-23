package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News,String> {
    List<News> findNewsAllByOrderByNewsNo();
}
