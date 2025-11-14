CREATE DATABASE movies_review;
USE movies_review;

-- Table for Movies with auto-incrementing ID
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE
);

-- Table for Users with auto-incrementing ID (Consolidated from your last two attempts)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(255) NOT NULL,  
    last_name VARCHAR(255) NOT NULL,   
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,    
    mobile VARCHAR(20),                
    birth DATE
);

-- Table for Reviews with auto-incrementing ID and Foreign Keys
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    review TEXT NOT NULL,
    rating INT,
    user_id INT NOT NULL,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Added default timestamp
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Junction table for shares (many-to-many relationship)
CREATE TABLE shares (
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (review_id, user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
