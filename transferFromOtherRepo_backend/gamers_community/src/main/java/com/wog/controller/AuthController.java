package com.wog.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import com.wog.service.AuthService;
import com.wog.dto.AuthDto;
import jakarta.inject.Inject;

import jakarta.validation.Valid;

@Controller("/api/auth")
@Secured(SecurityRule.IS_ANONYMOUS)
public class AuthController {

    private final AuthService authService;

    @Inject
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Post("/test")
    @Secured(SecurityRule.IS_ANONYMOUS)
    public HttpResponse<String> test() {
        return HttpResponse.ok("Auth controller working");
    }

    @Post("/login")
    @Secured(SecurityRule.IS_ANONYMOUS)
    public HttpResponse<AuthDto.LoginResponse> login(@Valid @Body AuthDto.LoginRequest request) {
        System.out.println("AuthController.login() called");
        System.out.println("Request email: " + request.getEmail());
        
        try {
            AuthDto.LoginResponse response = authService.login(request);
            return HttpResponse.ok(response);
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            return HttpResponse.badRequest();
        }
    }

    @Post("/refresh")
    @Secured(SecurityRule.IS_ANONYMOUS)
    public HttpResponse<AuthDto.TokenResponse> refresh(@Valid @Body AuthDto.RefreshTokenRequest request) {
        try {
            AuthDto.TokenResponse response = authService.refreshToken(request.getRefreshToken());
            return HttpResponse.ok(response);
        } catch (Exception e) {
            return HttpResponse.unauthorized();
        }
    }

    @Post("/logout")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public HttpResponse<Void> logout() {
        // Token-based logout is handled client-side by removing the token
        // In production, you might want to blacklist the token
        return HttpResponse.ok();
    }
}





