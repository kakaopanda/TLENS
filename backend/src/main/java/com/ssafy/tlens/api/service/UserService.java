package com.ssafy.tlens.api.service;

import com.ssafy.tlens.api.response.KeywordResponseDTO;
import com.ssafy.tlens.dto.SignUpRequestDto;
import com.ssafy.tlens.entity.rdbms.Keyword;

import java.util.List;

public interface UserService {
    void signUp(SignUpRequestDto member) throws Exception;
    void logout(String requestEmail, String ATK);
    List<KeywordResponseDTO> getKeywordByUser(Long userId);
}