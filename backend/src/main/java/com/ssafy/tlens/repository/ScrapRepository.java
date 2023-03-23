package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.UserNewsScrap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrapRepository extends JpaRepository<UserNewsScrap, Long> {
}
