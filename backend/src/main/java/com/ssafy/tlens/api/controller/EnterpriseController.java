package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.service.EnterpriseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/enterprise")
public class EnterpriseController {

    private final EnterpriseService enterpriseService;

    @PostMapping("/trend")
    public void insertToEnterprise(@RequestBody @Valid TrendRequestDTO request) {
        enterpriseService.insertToEnterprise(request);
    }

    @PatchMapping("/trend")
    public void updateToEnterprise(@RequestBody @Valid TrendRequestDTO request) {
        enterpriseService.updateToEnterprise(request);
    }

    @DeleteMapping("/trend")
    public void deleteToEnterprise(@RequestParam Long id) {
        enterpriseService.deleteToEnterprise(id);
    }
}
