package com.ssafy.tlens.api.service;

import com.ssafy.tlens.entity.rdbms.News;

import java.io.IOException;
import java.util.List;

public interface NewsService {
    List<News> getNewsData() throws IOException;
}
