package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.request.SignUpRequestDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    void signUp(SignUpRequestDto member) throws Exception;
    void logout(String requestEmail, String ATK);
    ResponseEntity<?> confirm(String email, String rawPwd);

    ResponseEntity<?> update(String email, String rawPwd);
}