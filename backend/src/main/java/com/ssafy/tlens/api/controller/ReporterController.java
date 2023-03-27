package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.service.ReporterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reporter")
public class ReporterController {

    private final ReporterService reporterService;

    @PostMapping("/trend")
    public void insertToReporter(@RequestBody @Valid TrendRequestDTO request) {
        reporterService.insertToReporter(request);
    }

    @PatchMapping("/trend")
    public void updateToReporter(@RequestBody @Valid TrendRequestDTO request) {
        reporterService.updateToReporter(request);
    }

    @DeleteMapping("/trend")
    public void deleteToReporter(@RequestParam Long id) {
        reporterService.deleteToReporter(id);
    }

}
