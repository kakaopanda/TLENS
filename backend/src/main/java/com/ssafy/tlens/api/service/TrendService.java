package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;

public interface TrendService {

    void insertToEnterprise(TrendRequestDTO trendRequestDTO);
    void insertToPress(TrendRequestDTO trendRequestDTO);
    void insertToCategory(TrendRequestDTO trendRequestDTO);
    void insertToReporter(TrendRequestDTO trendRequestDTO);
    void insertToRegion(TrendRequestDTO trendRequestDTO);
    void updateToEnterprise(TrendRequestDTO trendRequestDTO);
    void updateToPress(TrendRequestDTO trendRequestDTO);
    void updateToCategory(TrendRequestDTO trendRequestDTO);
    void updateToReporter(TrendRequestDTO trendRequestDTO);
    void updateToRegion(TrendRequestDTO trendRequestDTO);
    void deleteToEnterprise(Long id);
    void deleteToPress(Long id);
    void deleteToCategory(Long id);
    void deleteToReporter(Long id);
    void deleteToRegion(Long id);

}
