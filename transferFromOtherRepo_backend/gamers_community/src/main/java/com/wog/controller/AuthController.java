package com.wog.controller;

import io.micronaut.http.annotation.*;

@Controller("/auth")
public class AuthController {

    @Get(uri="/", produces="text/plain")
    public String index() {
        return "Example Response";
    }
}