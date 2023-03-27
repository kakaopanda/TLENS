package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;

public interface ReporterService {

    void insertToReporter(TrendRequestDTO trendRequestDTO);
    void updateToReporter(TrendRequestDTO trendRequestDTO);
    void deleteToReporter(Long id);
}
