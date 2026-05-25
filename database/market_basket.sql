CREATE DATABASE market_basket;

USE market_basket;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataset_id INT NOT NULL,
    antecedent TEXT NOT NULL,
    consequent TEXT NOT NULL,
    support_value FLOAT NOT NULL,
    confidence_value FLOAT NOT NULL,
    lift_value FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE datasets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    file_name VARCHAR(255),
    file_path TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

drop table market_basket.datasets ;

drop table market_basket.rules ;

SELECT * FROM market_basket.users u  ;

SELECT * FROM market_basket.datasets d  ;

SELECT * FROM market_basket.rules r ;