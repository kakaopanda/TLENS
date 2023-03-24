package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
