package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.ScrapRequestDTO;

public interface ScrapService {

    void insert(ScrapRequestDTO scrapRequestDTO);
    void delete(ScrapRequestDTO scrapRequestDTO);
}
