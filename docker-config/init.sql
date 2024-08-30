-- docker-config/init.sql
CREATE TABLE IF NOT EXISTS funkos_categoria (
                                                id SERIAL PRIMARY KEY,
                                                nombre VARCHAR(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS funkos_funko (
                                            id SERIAL PRIMARY KEY,
                                            nombre VARCHAR(100) NOT NULL,
    categoria_id INTEGER REFERENCES funkos_categoria(id),
    precio DECIMAL(10, 2) NOT NULL,
    cantidad INTEGER NOT NULL
    );

INSERT INTO funkos_categoria (nombre) VALUES ('MARVEL'), ('DISNEY');

-- Insertar funkos con precio y cantidad
INSERT INTO funkos_funko (nombre, categoria_id, precio, cantidad) VALUES
                                                                      ('Iron Man', (SELECT id FROM funkos_categoria WHERE nombre = 'MARVEL'), 19.99, 50),
                                                                      ('Spider-Man', (SELECT id FROM funkos_categoria WHERE nombre = 'MARVEL'), 15.99, 30),
                                                                      ('Mickey Mouse', (SELECT id FROM funkos_categoria WHERE nombre = 'DISNEY'), 25.00, 20),
                                                                      ('Donald Duck', (SELECT id FROM funkos_categoria WHERE nombre = 'DISNEY'), 22.50, 25);