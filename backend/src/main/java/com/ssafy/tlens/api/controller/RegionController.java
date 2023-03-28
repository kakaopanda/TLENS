package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.service.RegionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/region")
public class RegionController {

    private final RegionService regionService;

    @PostMapping("/trend")
    public void insertToRegion(@RequestBody @Valid TrendRequestDTO request) {
        regionService.insertToRegion(request);
    }

    @PatchMapping("/trend")
    public void updateToRegion(@RequestBody @Valid TrendRequestDTO request) {
        regionService.updateToRegion(request);
    }

    @DeleteMapping("/trend")
    public void deleteToRegion(@RequestParam Long id) {
        regionService.deleteToRegion(id);
    }
}
