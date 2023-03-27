package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.entity.rdbms.Press;
import com.ssafy.tlens.entity.rdbms.PressTrend;
import com.ssafy.tlens.repository.PressRepository;
import com.ssafy.tlens.repository.PressTrendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PressServiceImpl implements PressService {

    private PressTrendRepository pressTrendRepository;
    private PressRepository pressRepository;

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

    public void updateToPress(TrendRequestDTO request) {

        PressTrend trend = pressTrendRepository.findById(request.getTargetId())
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + request.getTargetId()));

        trend.update(request.getKeyword(),request.getCount(),request.getDate());
    }

    public void deleteToPress(Long id) {

        PressTrend trend = pressTrendRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Could not found trend id : " + id));

        pressTrendRepository.delete(trend);
    }
}
