package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.repository.RegionRepository;
import com.ssafy.tlens.repository.RegionTrendRepository;

public interface RegionService {

    void insertToRegion(TrendRequestDTO trendRequestDTO);
    void updateToRegion(TrendRequestDTO trendRequestDTO);
    void deleteToRegion(Long id);


}
