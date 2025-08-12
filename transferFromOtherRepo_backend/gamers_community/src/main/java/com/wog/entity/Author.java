
package com.wog.entity;


import io.micronaut.core.annotation.Introspected;

import java.time.LocalDateTime;

@Introspected
public class Author {
    
    private Long id;
    private String name;
    private String bio;
    private Integer birthYear;
    private Integer deathYear;
    private LocalDateTime createdAt;
    
    // Default constructor
    public Author() {}
    
    // Constructor for creation
    public Author(String name, String bio, Integer birthYear, Integer deathYear) {
        this.name = name;
        this.bio = bio;
        this.birthYear = birthYear;
        this.deathYear = deathYear;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getBio() {
        return bio;
    }
    
    public void setBio(String bio) {
        this.bio = bio;
    }
    
    public Integer getBirthYear() {
        return birthYear;
    }
    
    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }
    
    public Integer getDeathYear() {
        return deathYear;
    }
    
    public void setDeathYear(Integer deathYear) {
        this.deathYear = deathYear;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public boolean isHistorical() {
        return deathYear != null;
    }
    
    @Override
    public String toString() {
        return "Author{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", birthYear=" + birthYear +
                ", deathYear=" + deathYear +
                '}';
    }
}


