
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
import java.util.UUID;

@Singleton
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenGenerator jwtTokenGenerator;

    // Token expiration times in seconds
    private static final long ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 minutes
    private static final long REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days

    @Inject
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenGenerator jwtTokenGenerator) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    public AuthDto.LoginResponse login(AuthDto.LoginRequest request) {
        System.out.println("AuthService.login() called with email: " + request.getEmail());
        
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

        // Generate access token (short-lived)
        String accessToken = generateAccessToken(user);
        
        // Generate refresh token (long-lived)
        String refreshToken = generateRefreshToken(user);
        
        AuthDto.UserInfo userInfo = new AuthDto.UserInfo(user);
        
        return new AuthDto.LoginResponse(userInfo, accessToken, refreshToken);
    }

    private String generateAccessToken(User user) {
        long currentTime = System.currentTimeMillis() / 1000;
        
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getEmail());
        claims.put("userId", user.getId().toString());
        claims.put("iat", currentTime);
        claims.put("exp", currentTime + ACCESS_TOKEN_EXPIRY);
        claims.put("type", "access");
        
        if (user.getRole() != null) {
            claims.put("role", user.getRole().name());
        }
        
        return jwtTokenGenerator.generateToken(claims)
            .orElseThrow(() -> new RuntimeException("Failed to generate access token"));
    }

    private String generateRefreshToken(User user) {
        long currentTime = System.currentTimeMillis() / 1000;
        
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getEmail());
        claims.put("userId", user.getId().toString());
        claims.put("iat", currentTime);
        claims.put("exp", currentTime + REFRESH_TOKEN_EXPIRY);
        claims.put("type", "refresh");
        claims.put("jti", UUID.randomUUID().toString()); // Unique token ID for revocation
        
        return jwtTokenGenerator.generateToken(claims)
            .orElseThrow(() -> new RuntimeException("Failed to generate refresh token"));
    }

    public AuthDto.TokenResponse refreshToken(String refreshToken) {
        // TODO: Implement token refresh logic
        // 1. Validate refresh token
        // 2. Extract user info
        // 3. Generate new access token
        // 4. Optionally rotate refresh token
        throw new RuntimeException("Token refresh not yet implemented");
    }
}
