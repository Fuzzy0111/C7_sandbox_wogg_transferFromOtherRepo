-- database/schema.sql
-- DDL for WOGG MySQL Database

DROP DATABASE IF EXISTS wogg_mysql_db;
CREATE DATABASE wogg_mysql_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wogg_mysql_db;

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    status ENUM('ACTIVE', 'PENDING', 'INACTIVE') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Creators table
CREATE TABLE creators (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    birth_year INT,
    death_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_type enum('INDIE-AUTHOR', 'SINGLE-AUTHOR', 'INDIE-TEAM', 'CORPORATION','INDIE-STUDIO',  'STUDIO') NOT NULL DEFAULT 'STUDIO',
    INDEX idx_name (name)
);

-- Stocks table
CREATE TABLE stocks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    creator_id BIGINT,
    product_type ENUM('GAME', 'HARDWARE', 'MERCHANDISE') DEFAULT 'GAME',
    creation_year INT,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    photo_url TEXT,
    FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE SET NULL,
    INDEX idx_product_type (product_type),
    INDEX idx_year (creation_year),
    INDEX idx_price (price),
    INDEX idx_active (is_active),
    INDEX idx_creator (creator_id),
    FULLTEXT idx_description (description)
);

-- Reservations table
CREATE TABLE reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity_reserved INT NOT NULL DEFAULT 1,
    status ENUM('PENDING', 'REDEEMED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    redeemed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES stocks(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_product (product_id),
    INDEX idx_status (status),
    INDEX idx_expires (expires_at),
    INDEX idx_reserved (reserved_at)
);

-- Email notifications table
CREATE TABLE email_notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    email_type ENUM('ACCOUNT_CREATION', 'PASSWORD_RESET', 'RESERVATION_EXPIRY') NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SENT', 'FAILED') NOT NULL DEFAULT 'SENT',

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (email_type),
    INDEX idx_sent_at (sent_at)
);




