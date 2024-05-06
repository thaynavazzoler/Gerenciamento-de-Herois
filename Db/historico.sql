CREATE TABLE historico (
    id SERIAL PRIMARY KEY,
    vencedor INT,
    perdedor INT,
    data DATE,
    FOREIGN KEY (vencedor) REFERENCES herois(id),
    FOREIGN KEY (perdedor) REFERENCES herois(id)
);