
CREATE DATABASE movies_review
USE movies_review;


    CREATE TABLE movies (
        id INT PRIMARY KEY,
        title TEXT,
        release_date DATE
    );


CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(254) UNIQUE, 
    password TEXT,
    mobile TEXT,
    birth DATE
);


CREATE TABLE reviews (
    id INT PRIMARY KEY,
    movie_id INT NOT NULL,
    review TEXT,
    rating INT,
    user_id INT NOT NULL,
    modified TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the "shares" table as a junction table for the many-to-many relationship between "users" and "reviews"
CREATE TABLE shares (
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (review_id, user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
