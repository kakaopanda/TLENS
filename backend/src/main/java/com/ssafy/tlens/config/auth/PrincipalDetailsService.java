package com.ssafy.tlens.config.auth;

import com.ssafy.tlens.entity.rdbms.User;
import com.ssafy.tlens.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        System.out.println("PrincipalDetailsService : 진입");

        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            return new PrincipalDetails(user.get());
        }
        return null;
    }
}