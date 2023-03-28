package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.response.ReporterInfoDTO;

import java.util.List;

public interface ReporterService {

    void insertToReporter(TrendRequestDTO trendRequestDTO);
    void updateToReporter(TrendRequestDTO trendRequestDTO);
    void deleteToReporter(Long id);
    List<ReporterInfoDTO> getReportersByPress(Long pressId);

}
