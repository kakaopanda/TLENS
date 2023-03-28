package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.response.MainCategoryDTO;

import java.util.List;

public interface CategoryService {

    void insertToCategory(TrendRequestDTO trendRequestDTO);
    void updateToCategory(TrendRequestDTO trendRequestDTO);
    void deleteToCategory(Long id);
    List<MainCategoryDTO> getMainCategory();
}
