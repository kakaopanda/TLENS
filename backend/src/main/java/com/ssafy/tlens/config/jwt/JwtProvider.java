package com.ssafy.tlens.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.tlens.enums.ResponseEnum;
import com.ssafy.tlens.handler.exception.CustomAuthenticationException;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    public String getUserEmail(String jwt) {
        try {
            return JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwt)
                    .getClaim("email").asString();
        }catch (Exception e){
            throw new CustomAuthenticationException(ResponseEnum.AUTH_REFRESH_EXPIRED);
        }
    }

    public String createAccessToken(Long userIdx, String username){
        return createToken(userIdx,username,JwtProperties.EXPIRATION_TIME);
    }

    public String createRefreshToken(Long userIdx, String username){
        return createToken(userIdx,username,JwtProperties.EXPIRATION_TIME_REFRESH);
    }

    private String createToken(Long userIdx, String email, Long expirationTime){
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(new Date(System.currentTimeMillis()+expirationTime))
                .withClaim("id", userIdx)
                .withClaim("email", email)
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }
}
