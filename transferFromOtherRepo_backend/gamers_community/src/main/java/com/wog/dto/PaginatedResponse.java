package com.wog.dto;

import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public record PaginatedResponse<T>(
        List<T> data,
        long total,
        int page,
        int limit,
        int totalPages
) {}
