package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.entity.rdbms.Category;
import com.ssafy.tlens.entity.rdbms.CategoryTrend;
import com.ssafy.tlens.repository.CategoryRepository;
import com.ssafy.tlens.repository.CategoryTrendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private CategoryTrendRepository categoryTrendRepository;
    private CategoryRepository categoryRepository;

    public void insertToCategory(TrendRequestDTO request) {

        Category category = categoryRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found category id : " + request.getTargetId()));

        CategoryTrend categoryTrend = CategoryTrend.builder()
                .keyword(request.getKeyword())
                .count(request.getCount())
                .date(request.getDate())
                .category(category)
                .build();

        categoryTrendRepository.save(categoryTrend);
    }

    public void updateToCategory(TrendRequestDTO request) {

        CategoryTrend trend = categoryTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void deleteToCategory(Long id) {

        CategoryTrend trend = categoryTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        categoryTrendRepository.delete(trend);
    }
}
