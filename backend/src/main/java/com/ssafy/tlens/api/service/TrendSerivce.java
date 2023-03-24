package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.CreateTrendRequestDTO;

public interface TrendSerivce {

    void insertToEnterprise(CreateTrendRequestDTO createTrendRequestDTO);
    void insertToPress(CreateTrendRequestDTO createTrendRequestDTO);
    void insertToCategory(CreateTrendRequestDTO createTrendRequestDTO);
    void insertToReporter(CreateTrendRequestDTO createTrendRequestDTO);
    void insertToRegion(CreateTrendRequestDTO createTrendRequestDTO);
//    void deleteToEnterprise(Long id);
//    void deleteToPress(Long id);
//    void deleteToCategory(Long id);
//    void deleteToReporter(Long id);
//    void deleteToRegion(Long id);




}
