CREATE DATABASE batalhas_herois;

\c batalhas_herois;

CREATE TABLE herois (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    poder VARCHAR(255) NOT NULL,
    nivel INT NOT NULL,
    pontosdevida INTEGER NOT NULL,
    ataque INTEGER NOT NULL,
    defesa INTEGER NOT NULL
);

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Superman', 'Super força, voo, visão de calor', 100, 1000, 95, 90);

SELECT * FROM herois;