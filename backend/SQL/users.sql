CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthday DATE NOT NULL,
    entrance_date DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL 
);

CREATE TABLE student (
    users_id INT PRIMARY KEY,
    student_number VARCHAR(100) UNIQUE NOT NULL,
    school VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    badges JSON DEFAULT '[]', 
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admin (
    users_id INT PRIMARY KEY,
    role VARCHAR(100) NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (firstname, lastname, email, birthday, entrance_date, password, type)
VALUES ('John', 'Doe', 'john.doe@example.com', '1990-01-01', '2023-01-01', 'password123', 'student');