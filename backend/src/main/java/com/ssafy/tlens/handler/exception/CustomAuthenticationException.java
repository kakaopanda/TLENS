package com.ssafy.tlens.handler.exception;


import com.ssafy.tlens.enums.ResponseEnum;
import org.springframework.security.authentication.AuthenticationServiceException;

public class CustomAuthenticationException extends AuthenticationServiceException {

    private final ResponseEnum responseEnum;

    public CustomAuthenticationException(ResponseEnum responseEnum) {
        super(responseEnum.getMessage());
        this.responseEnum = responseEnum;
    }

    public ResponseEnum getResponseEnum() {
        return responseEnum;
    }
}