const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: " batalhas_herois",
    password: "ds564",
    port: 3000
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("A rota está funcionando perfeitamente!");
});

app.get("/herois", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM herois");
        res.status(200).send({
            message: "Herois encontrados com sucesso!",
            herois: rows,
          });
    } catch (error) {
        console.error("Erro ao buscar herois", error);
        res.status(500).send("Erro ao buscar herois");
    }
});

app.get("/herois/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM herois WHERE id = $1", [id]);
        res.status(200).send({
            message: "Herois encontrados com sucesso!",
            herois: rows,
          });
    } catch (error) {
        console.error("Erro ao buscar herois", error);
        res.status(500).send("Erro ao buscar herois");
    }
});

app.post("/herois", async (req, res) => {
    try {
        const { nome, poder } = req.body;
        const { rows } = await pool.query("INSERT INTO herois (nome, poder) VALUES ($1, $2) RETURNING *", [nome, poder]);
        res.status(200).send({
            message: "Heroi inserido com sucesso!",
            herois: rows,
          });
    } catch (error) {
        console.error("Erro ao inserir heroi", error);
        res.status(500).send("Erro ao inserir heroi");
    }
});
