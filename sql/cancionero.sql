CREATE TABLE canciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    himnario VARCHAR(100) NOT NULL,
    coro TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE estrofas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    texto TEXT NOT NULL,
    cancion_id INT NOT NULL,
    FOREIGN KEY (cancion_id) REFERENCES canciones(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 