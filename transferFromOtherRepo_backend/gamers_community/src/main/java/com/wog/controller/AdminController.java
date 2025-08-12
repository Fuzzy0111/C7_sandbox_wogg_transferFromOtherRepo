package com.wog.controller;

import io.micronaut.http.annotation.*;

@Controller("/admin")
public class AdminController {

    @Get(uri="/", produces="text/plain")
    public String index() {
        return "Example Response";
    }
}