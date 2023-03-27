package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;

public interface EnterpriseService {

    void insertToEnterprise(TrendRequestDTO trendRequestDTO);
    void updateToEnterprise(TrendRequestDTO trendRequestDTO);
    void deleteToEnterprise(Long id);
}
