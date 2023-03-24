package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.SubscribeRequestDTO;
import com.ssafy.tlens.common.exception.handler.DuplicateResourceException;
import com.ssafy.tlens.common.exception.handler.NotFoundException;
import com.ssafy.tlens.entity.rdbms.Reporter;
import com.ssafy.tlens.entity.rdbms.User;
import com.ssafy.tlens.entity.rdbms.Subscribe;
import com.ssafy.tlens.repository.ReporterRepository;
import com.ssafy.tlens.repository.SubscribeRepository;
import com.ssafy.tlens.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final UserRepository userRepository;
    private final ReporterRepository reporterRepository;
    private final SubscribeRepository subscribeRepository;
    @Override
    @Transactional
    public void insert(SubscribeRequestDTO subscribeRequestDTO) {
        User user = userRepository.findById(subscribeRequestDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("Could not found user id : " + subscribeRequestDTO.getUserId()));

        Reporter reporter = reporterRepository.findById(subscribeRequestDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("Could not found reporter id : " + subscribeRequestDTO.getReporterId()));

        // 이미 구독되어있으면 에러 반환
        if (subscribeRepository.findByUserAndReporter(user, reporter).isPresent()){
            // TODO 409에러로 변경
            throw new DuplicateResourceException("already exist data by user id :" + user.getUserId() + " ,"
                    + "reporter id : " + reporter.getReporterId());
        }

        Subscribe subscribe = Subscribe.builder()
                .user(user)
                .reporter(reporter)
                .build();

        subscribeRepository.save(subscribe);
    };

    @Override
    @Transactional
    public void delete(SubscribeRequestDTO subscribeRequestDTO) {
        User user = userRepository.findById(subscribeRequestDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("Could not found user id : " + subscribeRequestDTO.getUserId()));

        Reporter reporter = reporterRepository.findById(subscribeRequestDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("Could not found reporter id : " + subscribeRequestDTO.getReporterId()));

        Subscribe subscribe = subscribeRepository.findByUserAndReporter(user, reporter)
                .orElseThrow(() -> new NotFoundException("Could not found subscribe id"));

        subscribeRepository.delete(subscribe);
    };
}
