CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE TODOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO TODOS (title, completed) VALUES ('Tarea 1', false);
