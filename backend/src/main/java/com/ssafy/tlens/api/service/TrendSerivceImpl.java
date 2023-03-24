package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.CreateTrendRequestDTO;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.entity.rdbms.*;
import com.ssafy.tlens.entity.rdbms.Enterprise;
import com.ssafy.tlens.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrendSerivceImpl implements TrendSerivce {

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

    public void insertToEnterprise(CreateTrendRequestDTO request) {

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

    public void insertToPress(CreateTrendRequestDTO request) {

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

    public void insertToCategory(CreateTrendRequestDTO request) {

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

    public void insertToReporter(CreateTrendRequestDTO request) {

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

    public void insertToRegion(CreateTrendRequestDTO request) {

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
}