package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.service.TrendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/trend")
public class TrendController {

    private final TrendService trendService;

    @PostMapping("/enterprise")
    public void insertToEnterprise(@RequestBody @Valid TrendRequestDTO request) {
        trendService.insertToEnterprise(request);
    }

    @PostMapping("/press")
    public void insertToPress(@RequestBody @Valid TrendRequestDTO request) {
        trendService.insertToPress(request);
    }

    @PostMapping("/reporter")
    public void insertToReporter(@RequestBody @Valid TrendRequestDTO request) {
        trendService.insertToReporter(request);
    }

    @PostMapping("/category")
    public void insertToCategory(@RequestBody @Valid TrendRequestDTO request) {
        trendService.insertToCategory(request);
    }

    @PostMapping("/region")
    public void insertToRegion(@RequestBody @Valid TrendRequestDTO request) {
        trendService.insertToRegion(request);
    }


    @PatchMapping("/enterprise")
    public void updateToEnterprise(@RequestBody @Valid TrendRequestDTO request) {
        trendService.updateToEnterprise(request);
    }

    @PatchMapping("/press")
    public void updateToPress(@RequestBody @Valid TrendRequestDTO request) {
        trendService.updateToPress(request);
    }

    @PatchMapping("/reporter")
    public void updateToReporter(@RequestBody @Valid TrendRequestDTO request) {
        trendService.updateToReporter(request);
    }

    @PatchMapping("/category")
    public void updateToCategory(@RequestBody @Valid TrendRequestDTO request) {
        trendService.updateToCategory(request);
    }

    @PatchMapping("/region")
    public void updateToRegion(@RequestBody @Valid TrendRequestDTO request) {
        trendService.updateToRegion(request);
    }

    @DeleteMapping("/enterprise")
    public void deleteToEnterprise(@RequestParam Long id) {
        trendService.deleteToEnterprise(id);
    }

    @DeleteMapping("/press")
    public void deleteToPress(@RequestParam Long id) {
        trendService.deleteToPress(id);
    }

    @DeleteMapping("/category")
    public void deleteToCategory(@RequestParam Long id) {
        trendService.deleteToCategory(id);
    }

    @DeleteMapping("/reporter")
    public void deleteToReporter(@RequestParam Long id) {
        trendService.deleteToReporter(id);
    }

    @DeleteMapping("/region")
    public void deleteToRegion(@RequestParam Long id) {
        trendService.deleteToRegion(id);
    }

}