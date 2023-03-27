package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.service.PressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/press")
public class PressController {

    private final PressService pressService;

    @PostMapping("/trend")
    public void insertToPress(@RequestBody @Valid TrendRequestDTO request) {
        pressService.insertToPress(request);
    }

    @PatchMapping("/trend")
    public void updateToPress(@RequestBody @Valid TrendRequestDTO request) {
        pressService.updateToPress(request);
    }

    @DeleteMapping("/trend")
    public void deleteToPress(@RequestParam Long id) {
        pressService.deleteToPress(id);
    }
}
