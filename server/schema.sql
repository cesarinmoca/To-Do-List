CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE STUDENT (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO STUDENT (name, email) VALUES ('John Doe', 'john@gmail.com'), ('Jane Smith', 'jane@gmail.com');