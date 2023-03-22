package com.ssafy.tlens.common.auth;

import com.ssafy.tlens.entity.rdbms.User;
import com.ssafy.tlens.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService{


	private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("name" + username);
    		User user = userRepository.findByEmail(username).orElseThrow(() -> new NoSuchElementException("없는 회원입니다."));
    		if(user != null) {
    			CustomUserDetails userDetails = new CustomUserDetails(user);
    			return userDetails;
    		}
    		return null;
    }
}
