package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
