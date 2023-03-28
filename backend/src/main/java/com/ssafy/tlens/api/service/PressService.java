package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.response.MainPressDTO;

import java.util.List;

public interface PressService {
    void insertToPress(TrendRequestDTO trendRequestDTO);
    void updateToPress(TrendRequestDTO trendRequestDTO);
    void deleteToPress(Long id);
    List<MainPressDTO> getMainPress();
}
