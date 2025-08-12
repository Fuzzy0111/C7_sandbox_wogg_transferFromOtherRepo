
package com.wog.repository;

import com.wog.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    
    Optional<User> findById(Long id);
    
    Optional<User> findByEmail(String email);
    
    List<User> findAll(User.UserRole role, User.UserStatus status);
    
    User save(User user);
    
    User update(User user);
    
    boolean deleteById(Long id);
    
    int countByRole(User.UserRole role);
    
    int countByStatus(User.UserStatus status);
    
    boolean existsByEmail(String email);
    
    boolean existsByEmailAndNotId(String email, Long id);
}


