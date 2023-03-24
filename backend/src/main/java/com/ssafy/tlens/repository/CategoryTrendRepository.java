package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.CategoryTrend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryTrendRepository extends JpaRepository<CategoryTrend, Long> {
}
