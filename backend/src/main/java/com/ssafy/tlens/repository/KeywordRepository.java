package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.Keyword;
import com.ssafy.tlens.entity.rdbms.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    Optional<Keyword> findByUserAndName(User user, String name);
}
