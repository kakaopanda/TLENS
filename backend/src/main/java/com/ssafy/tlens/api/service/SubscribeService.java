package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.SubscribeRequestDTO;
import org.springframework.data.crossstore.ChangeSetPersister;

public interface SubscribeService {

    void insert(SubscribeRequestDTO subscribeRequestDTO);
    void delete(SubscribeRequestDTO subscribeRequestDTO);
}
