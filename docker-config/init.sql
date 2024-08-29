-- docker-config/init.sql
CREATE TABLE IF NOT EXISTS funkos_categoria (
                                                id SERIAL PRIMARY KEY,
                                                nombre VARCHAR(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS funkos_funko (
                                            id SERIAL PRIMARY KEY,
                                            nombre VARCHAR(100) NOT NULL,
    categoria_id INTEGER REFERENCES funkos_categoria(id)
    );

INSERT INTO funkos_categoria (nombre) VALUES ('MARVEL'), ('DISNEY');

INSERT INTO funkos_funko (nombre, categoria_id) VALUES
                                                    ('Iron Man', (SELECT id FROM funkos_categoria WHERE nombre = 'MARVEL')),
                                                    ('Spider-Man', (SELECT id FROM funkos_categoria WHERE nombre = 'MARVEL')),
                                                    ('Mickey Mouse', (SELECT id FROM funkos_categoria WHERE nombre = 'DISNEY')),
                                                    ('Donald Duck', (SELECT id FROM funkos_categoria WHERE nombre = 'DISNEY'));