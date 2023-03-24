package com.ssafy.tlens.api.controller;

import com.ssafy.tlens.common.model.response.HttpResponseEntity.ResponseResult;
import com.ssafy.tlens.api.request.SubscribeRequestDTO;
import com.ssafy.tlens.api.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import static com.ssafy.tlens.common.model.response.HttpResponseEntity.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/subscribe")
public class SubscribeController {

    private final SubscribeService subscribeService;

    @PostMapping
    public ResponseResult<?> insert(@RequestBody @Valid SubscribeRequestDTO subscribeRequestDTO) throws Exception {
        subscribeService.insert(subscribeRequestDTO);
        return success();
    }

    @DeleteMapping
    public ResponseResult<?> delete(@RequestBody @Valid SubscribeRequestDTO subscribeRequestDTO) {
        subscribeService.delete(subscribeRequestDTO);
        return success();
    }
}
