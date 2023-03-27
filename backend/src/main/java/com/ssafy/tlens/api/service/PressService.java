package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;

public interface PressService {
    void insertToPress(TrendRequestDTO trendRequestDTO);
    void updateToPress(TrendRequestDTO trendRequestDTO);
    void deleteToPress(Long id);
}
