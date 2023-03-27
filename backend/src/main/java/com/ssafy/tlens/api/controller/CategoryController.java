package com.ssafy.tlens.api.controller;


import com.ssafy.tlens.api.request.TrendRequestDTO;
import com.ssafy.tlens.api.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/trend")
    public void insertToCategory(@RequestBody @Valid TrendRequestDTO request) {
        categoryService.insertToCategory(request);
    }

    @PatchMapping("/trend")
    public void updateToCategory(@RequestBody @Valid TrendRequestDTO request) {
        categoryService.updateToCategory(request);
    }

    @DeleteMapping("/trend")
    public void deleteToCategory(@RequestParam Long id) {
        categoryService.deleteToCategory(id);
    }

}
