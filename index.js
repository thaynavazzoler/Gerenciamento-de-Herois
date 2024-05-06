const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "batalhas_herois",
  password: "ds564",
  port: 5432, // Porta padrão do PostgreSQL
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
    const { rows } = await pool.query("SELECT * FROM herois WHERE id = $1", [
      id,
    ]);
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
    const { nome, poder, nivel, pontosdevida, ataque, defesa } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nome, poder, nivel, pontosdevida, ataque, defesa]
    );
    res.status(201).send({
      message: "Heroi criado com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao criar heroi", error);
    res.status(500).send("Erro ao criar heroi");
  }
});

app.put("/herois/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, poder } = req.body;
    const { rows } = await pool.query(
      "UPDATE herois SET nome = $1, poder = $2 WHERE id = $3 RETURNING *",
      [nome, poder, id]
    );
    res.status(200).send({
      message: "Heroi atualizado com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao atualizar heroi", error);
    res.status(500).send("Erro ao atualizar heroi");
  }
});

app.delete("/herois/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "DELETE FROM herois WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).send({
      message: "Heroi deletado com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao deletar heroi", error);
    res.status(500).send("Erro ao deletar heroi");
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

// Filtro por nome herói

app.get("/herois/nome/:nome", async (req, res) => {
  try {
    const { nome } = req.params;
    const { rows } = await pool.query("SELECT * FROM herois WHERE nome = $1", [
      nome,
    ]);
    res.status(200).send({
      message: "Herois encontrados com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar herois", error);
    res.status(500).send("Erro ao buscar herois");
  }
});

// Filtro por poder herói

app.get("/herois/poder/:poder", async (req, res) => {
  try {
    const { poder } = req.params;
    const { rows } = await pool.query("SELECT * FROM herois WHERE poder = $1", [
      poder,
    ]);
    res.status(200).send({
      message: "Herois encontrados com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar herois", error);
    res.status(500).send("Erro ao buscar herois");
  }
});

app.get("/batalhar/:idHeroi1/:idHeroi2", async (req, res) => {
  try {
    const { idHeroi1, idHeroi2 } = req.params;

    // Consulta SQL para recuperar os dados dos dois heróis em uma única consulta usando INNER JOIN
    const query = `
        SELECT nome FROM herois WHERE id = $1 OR id = $2
        `;

    const { rows } = await pool.query(query, [idHeroi1, idHeroi2]);

    if (rows.length !== 2) {
      return res.status(404).send("Heróis não encontrados");
    }

    const heroi1 = rows[0];
    const heroi2 = rows[1];

    while (heroi1.pontosdevida > 0 && heroi2.pontosdevida > 0) {
      heroi2.pontosdevida -= heroi1.ataque - heroi2.defesa;
      heroi1.pontosdevida -= heroi2.ataque - heroi1.defesa;
    }
    if (heroi1.pontosdevida > heroi2.pontosdevida) {
      vencedor = heroi1.nome;
    }
    if (heroi1.pontosdevida < heroi2.pontosdevida) {
      vencedor = heroi2.nome;
    } else {
      vencedor = "Empate";
    }

    const perdedor = vencedor === heroi1.nome ? heroi2.nome : heroi1.nome;

    addHistorico(vencedor, perdedor);
    res.status(200).send({
      message: "Batalha realizada com sucesso!",
      vencedor: vencedor,
    });
  } catch (error) {
    console.error("Erro ao realizar batalha", error);
    res.status(500).send("Erro ao realizar batalha");
  }
});

const addHistorico = async (vencedor, perdedor) => {
  const Hoje = new Date();
  try {
    const query = `
            INSERT INTO historico_batalhas (vencedor, perdedor, data) VALUES ($1, $2, $3)
            `;

    await pool.query(query, [vencedor, perdedor, Hoje]);
  } catch (error) {
    console.error("Erro ao adicionar histórico", error);
  }
};

app.get("/historico", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM historico_batalhas");
    res.status(200).send({
      message: "Histórico de batalhas encontrado com sucesso!",
      historico: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar histórico", error);
    res.status(500).send("Erro ao buscar histórico");
  }
});
