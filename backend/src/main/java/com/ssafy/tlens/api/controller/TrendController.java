package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.CreateTrendRequestDTO;
import com.ssafy.tlens.api.service.TrendSerivce;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trend")
public class TrendController {

    private final TrendSerivce trendSerivce;

    @PostMapping("/enterprise")
    public void insertToEnterprise(@RequestBody @Valid CreateTrendRequestDTO request) {
        trendSerivce.insertToEnterprise(request);
    }

    @PostMapping("/press")
    public void insertToPress(@RequestBody @Valid CreateTrendRequestDTO request) {
        trendSerivce.insertToPress(request);
    }

    @PostMapping("/reporter")
    public void insertToReporter(@RequestBody @Valid CreateTrendRequestDTO request) {
        trendSerivce.insertToReporter(request);
    }

    @PostMapping("/category")
    public void insertToCategory(@RequestBody @Valid CreateTrendRequestDTO request) {
        trendSerivce.insertToCategory(request);
    }

    @PostMapping("/region")
    public void insertToRegion(@RequestBody @Valid CreateTrendRequestDTO request) {
        trendSerivce.insertToRegion(request);
    }


}