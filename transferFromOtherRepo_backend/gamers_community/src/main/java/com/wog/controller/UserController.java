package com.wog.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import com.wog.service.UserService;
import com.wog.dto.UserDto;
import com.wog.entity.User;
import jakarta.inject.Inject;

import jakarta.validation.Valid;
import java.util.List;

@Controller("/api/users")
@Secured("USER")
public class UserController {

    private final UserService userService;

    @Inject
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Get
    @Secured("ADMIN")
    public HttpResponse<List<UserDto.Response>> getAllUsers(
            @QueryValue(value = "role", defaultValue = "") String role,
            @QueryValue(value = "status", defaultValue = "") String status) {
        
        User.UserRole userRole = role.isEmpty() ? null : User.UserRole.valueOf(role);
        User.UserStatus userStatus = status.isEmpty() ? null : User.UserStatus.valueOf(status);
        
        List<UserDto.Response> users = userService.findAll(userRole, userStatus);
        return HttpResponse.ok(users);
    }

    @Get("/{id}")
    @Secured("ADMIN")
    public HttpResponse<UserDto.Response> getUserById(@PathVariable Long id) {
        UserDto.Response user = userService.findById(id);
        return HttpResponse.ok(user);
    }

    @Post
    @Secured("ADMIN")
    public HttpResponse<UserDto.Response> createUser(@Valid @Body UserDto.CreateRequest request) {
        UserDto.Response user = userService.create(request);
        return HttpResponse.created(user);
    }

    @Put("/{id}")
    @Secured("ADMIN")
    public HttpResponse<UserDto.Response> updateUser(
            @PathVariable Long id,
            @Valid @Body UserDto.UpdateRequest request) {
        UserDto.Response user = userService.update(id, request);
        return HttpResponse.ok(user);
    }

    @Delete("/{id}")
    @Secured("ADMIN")
    public HttpResponse<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return HttpResponse.noContent();
    }

    @Post("/change-password")
    public HttpResponse<Void> changePassword(
            @Valid @Body UserDto.PasswordChangeRequest request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        userService.requestPasswordChange(userEmail, request.getCurrentPassword());
        return HttpResponse.ok();
    }
}


