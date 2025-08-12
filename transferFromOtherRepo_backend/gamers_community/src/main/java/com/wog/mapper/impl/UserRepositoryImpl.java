
package com.wog.mapper.impl;

import com.wog.entity.User;
import com.wog.repository.UserRepository;
import com.wog.mapper.UserMapper;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.Optional;

@Singleton
public class UserRepositoryImpl implements UserRepository {
    
    private final UserMapper userMapper;
    
    @Inject
    public UserRepositoryImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    
    @Override
    public Optional<User> findById(Long id) {
        return userMapper.findById(id);
    }
    
    @Override
    public Optional<User> findByEmail(String email) {
        return userMapper.findByEmail(email);
    }
    
    @Override
    public List<User> findAll(User.UserRole role, User.UserStatus status) {
        return userMapper.findAll(role, status);
    }
    
    @Override
    public User save(User user) {
        userMapper.insert(user);
        return user; // ID will be set by MyBatis
    }
    
    @Override
    public User update(User user) {
        int rowsAffected = userMapper.update(user);
        if (rowsAffected == 0) {
            throw new RuntimeException("User not found with id: " + user.getId());
        }
        return userMapper.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found after update"));
    }
    
    @Override
    public boolean deleteById(Long id) {
        return userMapper.deleteById(id) > 0;
    }
    
    @Override
    public int countByRole(User.UserRole role) {
        return userMapper.countByRole(role);
    }
    
    @Override
    public int countByStatus(User.UserStatus status) {
        return userMapper.countByStatus(status);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userMapper.existsByEmail(email);
    }
    
    @Override
    public boolean existsByEmailAndNotId(String email, Long id) {
        return userMapper.existsByEmailAndNotId(email, id);
    }
}


