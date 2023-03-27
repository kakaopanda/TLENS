package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;

public interface CategoryService {

    void insertToCategory(TrendRequestDTO trendRequestDTO);
    void updateToCategory(TrendRequestDTO trendRequestDTO);
    void deleteToCategory(Long id);
}
