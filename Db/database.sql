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

CREATE TABLE batalhas (
    id SERIAL PRIMARY KEY,
    hero1_id INT,
    hero2_id INT,
    vencedor_id INT,
    perdedor_id INT,
    FOREIGN KEY (hero1_id) REFERENCES herois(id),
    FOREIGN KEY (hero2_id) REFERENCES herois(id),
    FOREIGN KEY (vencedor_id) REFERENCES herois(id),
    FOREIGN KEY (perdedor_id) REFERENCES herois(id)
);
-- Inserir dados dos heróis da DC Comics
INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Superman', 'Super força, voo, visão de calor', 100, 1000, 95, 90),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Batman', 'Inteligência, habilidades em combate, tecnologia avançada', 98, 950, 92, 85),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Mulher Maravilha', 'Super força, agilidade, habilidades divinas', 98, 900, 92, 88),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Flash', 'Super velocidade', 90, 750, 98, 80),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Aquaman', 'Comunicação e controle de animais marinhos', 92, 850, 88, 92);

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Lanterna Verde', 'Anel do poder que cria construções com a mente', 94, 900, 88, 92),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Cyborg', 'Habilidades cibernéticas, tecnologia avançada', 88, 850, 85, 90),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Shazam', 'Força, velocidade, resistência e poderes mágicos', 95, 950, 90, 88),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Flecha Verde', 'Arqueiro habilidoso com flechas especiais', 85, 800, 82, 78),

INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Mulher-Gato', 'Agilidade, combate corpo a corpo, inteligência', 85, 800, 85, 82);


SELECT * FROM herois;