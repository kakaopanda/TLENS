package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.entity.rdbms.Enterprise;
import com.ssafy.tlens.entity.rdbms.EnterpriseTrend;
import com.ssafy.tlens.repository.EnterpriseRepository;
import com.ssafy.tlens.repository.EnterpriseTrendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnterpriseServiceImpl implements EnterpriseService {

    private EnterpriseTrendRepository enterpriseTrendRepository;
    private EnterpriseRepository enterpriseRepository;

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

    public void updateToEnterprise(TrendRequestDTO request) {

        EnterpriseTrend trend = enterpriseTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void deleteToEnterprise(Long id) {

        EnterpriseTrend trend = enterpriseTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        enterpriseTrendRepository.delete(trend);
    }
}
