package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.api.request.ScrapRequestDTO;
import com.ssafy.tlens.api.service.ScrapService;
import com.ssafy.tlens.common.model.response.HttpResponseEntity.ResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.ssafy.tlens.common.model.response.HttpResponseEntity.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scrap")
public class ScrapController {

    private final ScrapService scrapService;

    @PostMapping
    public ResponseResult<?> insert(@RequestBody @Valid ScrapRequestDTO scrapRequestDTO) throws Exception {
        scrapService.insert(scrapRequestDTO);
        return success();
    }

    @DeleteMapping
    public ResponseResult<?> delete(@RequestBody @Valid ScrapRequestDTO scrapRequestDTO) {
        scrapService.delete(scrapRequestDTO);
        return success();
    }
}
