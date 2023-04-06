package com.ssafy.tlens.repository;

import com.ssafy.tlens.entity.rdbms.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<Integer> deleteByEmail(String email);
    boolean existsByEmail(String userEmail);
//    Optional<User> findByUsername(String username);
}