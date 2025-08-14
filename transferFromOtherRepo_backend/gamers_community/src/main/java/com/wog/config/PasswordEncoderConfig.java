package com.wog.config;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.inject.Singleton;

@Factory
public class PasswordEncoderConfig {
    
    @Bean
    @Singleton
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


