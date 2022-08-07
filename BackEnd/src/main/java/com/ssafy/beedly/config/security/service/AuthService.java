package com.ssafy.beedly.config.security.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.beedly.common.exception.NotFoundException.USER_NOT_FOUND;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User findUser = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(findUser.getUserRole())));

        LoginUserDetails loginUserDetails = new LoginUserDetails(String.valueOf(findUser.getId()), "", authorities);
        loginUserDetails.setUser(findUser);
        return loginUserDetails;
    }
}
