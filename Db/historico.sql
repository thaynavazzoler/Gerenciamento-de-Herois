CREATE TABLE historico (
    id SERIAL PRIMARY KEY,
    vencedor INT NOT NULL,
    perdedor INT NOT NULL,
    data DATE,
    FOREIGN KEY (vencedor) REFERENCES herois(id),
    FOREIGN KEY (perdedor) REFERENCES herois(id)
);

SELECT h.nome AS vencedor, h2.nome AS perdedor, data
FROM historico
JOIN herois h ON h.id = historico.vencedor
JOIN herois h2 ON h2.id = historico.perdedor;
