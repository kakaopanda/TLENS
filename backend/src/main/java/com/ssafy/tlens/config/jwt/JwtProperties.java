package com.ssafy.tlens.config.jwt;

public interface JwtProperties {
    String SECRET = "TREND_LENS_SECRET"; // 우리 서버만 알고 있는 비밀값
    long EXPIRATION_TIME = 30 * 60 * 1000L; // 60 * 1000 -> 1분 (1/1000초) => 30분
    long EXPIRATION_TIME_REFRESH = 30 * 60 * 60 * 1000L; // 60 * 1000 -> 1분 (1/1000초) => 30일
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    String HEADER_REFRESH_STRING = "Authorization-refresh";
}