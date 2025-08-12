
package com.wog.service;

import io.micronaut.security.token.jwt.generator.JwtTokenGenerator;
import com.wog.dto.AuthDto;
import com.wog.entity.User;
import com.wog.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Singleton
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenGenerator jwtTokenGenerator;

    @Inject
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenGenerator jwtTokenGenerator) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    public AuthDto.LoginResponse login(AuthDto.LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOpt.get();
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Account is not active");
        }

        // Generate JWT token
//        String token = jwtTokenGenerator.generateToken(
//            Collections.singletonMap("sub", user.getEmail()),
//            Collections.singletonMap("role", user.getRole().name()),
//            3600 // 1 hour
//        ).orElseThrow(() -> new RuntimeException("Failed to generate token"));

        // Generate JWT token with correct API
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getEmail());
        claims.put("role", user.getRole().name());
        claims.put("userId", user.getId().toString());
        claims.put("exp", System.currentTimeMillis() / 1000 + 3600); // 1 hour from now
        
        String token = jwtTokenGenerator.generateToken(claims)
            .orElseThrow(() -> new RuntimeException("Failed to generate token"));

        AuthDto.UserInfo userInfo = new AuthDto.UserInfo(user);
        
        return new AuthDto.LoginResponse(token, "Bearer", 3600L, userInfo);
    }
}




