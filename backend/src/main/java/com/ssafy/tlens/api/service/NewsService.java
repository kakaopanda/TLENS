package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.response.NewsInfoDTO;

import java.io.IOException;
import java.util.List;

public interface NewsService {
    void getNewsData() throws IOException;
    List<NewsInfoDTO> getNewsBySearch(String searchword);
}
