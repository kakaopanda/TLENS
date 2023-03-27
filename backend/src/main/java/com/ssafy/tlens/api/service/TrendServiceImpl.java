package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.entity.rdbms.*;
import com.ssafy.tlens.entity.rdbms.Enterprise;
import com.ssafy.tlens.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrendServiceImpl implements TrendService {

    private EnterpriseTrendRepository enterpriseTrendRepository;
    private EnterpriseRepository enterpriseRepository;
    private PressTrendRepository pressTrendRepository;
    private PressRepository pressRepository;
    private CategoryTrendRepository categoryTrendRepository;
    private CategoryRepository categoryRepository;
    private ReporterTrendRepository reporterTrendRepository;
    private ReporterRepository reporterRepository;
    private RegionTrendRepository regionTrendRepository;
    private RegionRepository regionRepository;

    public void insertToEnterprise(TrendRequestDTO request) {

        Enterprise enterprise = enterpriseRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found enterprise id : " + request.getTargetId()));

        EnterpriseTrend enterpriseTrend = EnterpriseTrend.builder()
                .keyword(request.getKeyword())
                .count(request.getCount())
                .date(request.getDate())
                .enterprise(enterprise)
                .build();

        enterpriseTrendRepository.save(enterpriseTrend);
    }

    public void insertToPress(TrendRequestDTO request) {

        Press press = pressRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found press id : " + request.getTargetId()));

        PressTrend pressTrend = PressTrend.builder()
                .keyword(request.getKeyword())
                .count(request.getCount())
                .date(request.getDate())
                .press(press)
                .build();

        pressTrendRepository.save(pressTrend);
    }

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

    public void insertToReporter(TrendRequestDTO request) {

        Reporter reporter = reporterRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found reporter id : " + request.getTargetId()));

        ReporterTrend reporterTrend = ReporterTrend.builder()
                .keyword(request.getKeyword())
                .count(request.getCount())
                .date(request.getDate())
                .reporter(reporter)
                .build();

        reporterTrendRepository.save(reporterTrend);
    }

    public void insertToRegion(TrendRequestDTO request) {

        Region region = regionRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found region id : " + request.getTargetId()));

        RegionTrend regionTrend = RegionTrend.builder()
                .keyword(request.getKeyword())
                .count(request.getCount())
                .date(request.getDate())
                .region(region)
                .build();

        regionTrendRepository.save(regionTrend);
    }

    public void updateToEnterprise(TrendRequestDTO request) {

        EnterpriseTrend trend = enterpriseTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void updateToPress(TrendRequestDTO request) {

        PressTrend trend = pressTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void updateToCategory(TrendRequestDTO request) {

        CategoryTrend trend = categoryTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void updateToReporter(TrendRequestDTO request) {

        ReporterTrend trend = reporterTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void updateToRegion(TrendRequestDTO request) {

        RegionTrend trend = regionTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void deleteToEnterprise(Long id) {

        EnterpriseTrend trend = enterpriseTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        enterpriseTrendRepository.delete(trend);
    }

    public void deleteToPress(Long id) {

        PressTrend trend = pressTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        pressTrendRepository.delete(trend);
    }

    public void deleteToCategory(Long id) {

        CategoryTrend trend = categoryTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        categoryTrendRepository.delete(trend);
    }

    public void deleteToReporter(Long id) {

        ReporterTrend trend = reporterTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        reporterTrendRepository.delete(trend);
    }

    public void deleteToRegion(Long id) {

        RegionTrend trend = regionTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        regionTrendRepository.delete(trend);
    }
}