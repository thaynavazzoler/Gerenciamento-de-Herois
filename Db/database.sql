CREATE DATABASE IF NOT EXISTS batalhas_herois;

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
    id INT PRIMARY KEY AUTO_INCREMENT,
    hero1_id INT,
    hero2_id INT,
    vencedor_id INT,
    FOREIGN KEY (hero1_id) REFERENCES heroes(id),
    FOREIGN KEY (hero2_id) REFERENCES heroes(id),
    FOREIGN KEY (vencedor_id) REFERENCES heroes(id)
);
-- Inserir dados dos heróis da DC Comics
INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Superman', 'Super força, voo, visão de calor', 100, 1000, 95, 90),
INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Batman', 'Habilidades de detetive, artes marciais', 95, 800, 85, 95),
INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Wonder Woman', 'Super força, agilidade, habilidades divinas', 98, 900, 92, 88),
INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Flash', 'Super velocidade', 90, 750, 98, 80),
INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ('Aquaman', 'Comunicação e controle de animais marinhos', 92, 850, 88, 92);

