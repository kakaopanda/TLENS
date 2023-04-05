package com.ssafy.tlens.api.service;

import com.ssafy.tlens.common.RedisDao;
import com.ssafy.tlens.common.ResponseDto;
import com.ssafy.tlens.config.jwt.JwtProvider;
import com.ssafy.tlens.api.request.SignUpRequestDto;
import com.ssafy.tlens.entity.rdbms.User;
import com.ssafy.tlens.enums.ResponseEnum;
import com.ssafy.tlens.handler.exception.CustomApiException;
import com.ssafy.tlens.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component("userService")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisDao redisDao;

    public UserServiceImpl (
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtProvider jwtProvider,
            RedisDao redisDao) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.redisDao = redisDao;
    }


    @Override
    @Transactional
    public void signUp(SignUpRequestDto signUpRequestDto){
//        boolean isExist = userRepository
//                .existsByEmail(signUpRequestDto.getEmail());
//        if (isExist) throw new Exception("이미 존재하는 이메일입니다.");

        try {
            String encodedPassword = passwordEncoder.encode(signUpRequestDto.getPassword());

            User newUser;
            newUser = User.builder()
                    .email(signUpRequestDto.getEmail())
                    .password(encodedPassword)
                    .nickname(signUpRequestDto.getNickname())
                    .gender(signUpRequestDto.getGender())
                    .age(signUpRequestDto.getAge())
                    .build();
            User u = userRepository.save(newUser);

        }catch (Exception e){
            throw new CustomApiException(ResponseEnum.USER_JOIN_FAIL);
        }
    }

    @Override
    @Transactional
    public void logout(String requestEmail, String ATK) {
        // Redis에 저장되어 있는 RT 삭제
        String refreshTokenInRedis = redisDao.getValues(requestEmail);
        if (refreshTokenInRedis != null) {
            redisDao.deleteValues(requestEmail);
            System.out.println("삭제 완료");
        }

        // Redis에 로그아웃 처리한 AT 저장
//        long now = (new Date()).getTime();
//        long remain = jwtProvider.getExpiration(ATK);
//        Date blacklistTokenExpires = new Date(remain - now);
        long expiration = jwtProvider.getExpiration(ATK);
        System.out.println("ATK를 KEY로 하는 REDIS 값 삭제");
        redisDao.setValues(ATK, "logout", expiration);
        System.out.println("삭제 완료");

//        redisService.setValuesWithTimeout(requestAccessToken,
//                "logout",
//                expiration);
    }

    @Override
    @Transactional
    public ResponseEntity<?> confirm(String email, String rawPwd) {
        System.out.println("confirm 진입");
        User user = userRepository.findByEmail(email).orElseThrow(()
                -> new CustomApiException(ResponseEnum.FAIL_CONFIRM_PWD));
        System.out.println("rawPwd : " + rawPwd);
        System.out.println("user getPass" + user.getPassword());
        if (!passwordEncoder.matches(rawPwd, user.getPassword())){
            System.out.println("if문 진입 ");
            return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.FAIL_CONFIRM_PWD), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.USER_USERNAME_CK_SUCCESS), HttpStatus.OK);
    }
    @Override
    @Transactional
    public ResponseEntity<?> update(String email, String rawPwd) {
        System.out.println("update 진입, rawPwd : " + rawPwd);
        User user = userRepository.findByEmail(email).orElseThrow(()
                -> new CustomApiException(ResponseEnum.FAIL_CONFIRM_PWD));
        String encPassword = passwordEncoder.encode(rawPwd);
        user.update(encPassword);
        System.out.println("update 완료, encPassword : " + encPassword);
        return new ResponseEntity<>(new ResponseDto<>(ResponseEnum.USER_PROFILE_CHANGE_SUCCESS), HttpStatus.OK);
    }
}
