// Importação das dependências necessárias
const express = require("express");
const { Pool } = require("pg");

// Inicialização do servidor Express
const app = express();

// Configuração do Pool de conexão com o PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "batalhas_herois",
  password: "11by",
  port: 5432, // Porta padrão do PostgreSQL
});

app.use(express.json());

// Rota inicial para teste do servidor
app.get("/", (req, res) => {
  res.send("A rota está funcionando perfeitamente!");
});

// Rota para buscar todos os heróis
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

// Rota para buscar um herói pelo ID
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

// Rota para criar um novo herói
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

// Rota para atualizar um herói existente
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

// Rota para deletar um herói existente
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


// Rota para buscar heróis pelo nome
app.get("/herois/nome/:nome", async (req, res) => {
  try {
    const { nome } = req.params;
    const { rows } = await pool.query("SELECT * FROM herois WHERE nome = $1", [
      nome,
    ]);
    if (rows.length === 0) {
      return res.status(404).send({
        message: "Nenhum herói encontrado com esse nome.",
      });
    }
    res.status(200).send({
      message: "Heróis encontrados com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar heróis", error);
    res.status(500).send("Erro ao buscar heróis");
  }
});

// Rota para batalhar dois heróis
app.get("/batalhar/:idHeroi1/:idHeroi2", async (req, res) => {
  try {
    const { idHeroi1, idHeroi2 } = req.params;
    // Consulta ao banco de dados para obter informações do primeiro herói
    const { rows: rowsHeroi1 } = await pool.query(
      "SELECT * FROM herois WHERE id = $1",
      [idHeroi1]
    );
    // Consulta ao banco de dados para obter informações do segundo herói
    const { rows: rowsHeroi2 } = await pool.query(
      "SELECT * FROM herois WHERE id = $1",
      [idHeroi2]
    );
// Verifica se os heróis existem
    if (rowsHeroi1.length === 0 || rowsHeroi2.length === 0) {
      return res.status(404).send({
        message: "Heróis não encontrados.",
      });
    }
// Extrai informações dos heróis
    const heroi1 = rowsHeroi1[0];
    const heroi2 = rowsHeroi2[0];
// Calcula as vidas restantes dos heróis após a batalha
    const vidaHeroi1 = heroi1.pontosdevida - heroi2.ataque + heroi1.defesa;
    const vidaHeroi2 = heroi2.pontosdevida - heroi1.ataque + heroi2.defesa;
// Determina o vencedor da batalha com base nas vidas restantes
    if (vidaHeroi1 > vidaHeroi2) {
      return res.status(200).send({
        message: `O herói ${heroi1.nome} venceu a batalha!`,
        heroiVencedor: heroi1,
      });
    } else if (vidaHeroi2 > vidaHeroi1) {
      return res.status(200).send({
        message: `O herói ${heroi2.nome} venceu a batalha!`,
        heroiVencedor: heroi2,
      });
    } else {
      return res.status(200).send({
        message: "A batalha terminou em empate.",
      });
    }
  } catch (error) {
// Tratamento de erros durante a execução da rota
    console.error("Erro ao buscar heróis", error);
    res.status(500).send("Erro ao buscar heróis");
  }
});

// Rota para obter o histórico de batalhas dos herois e empates
app.get("/historico", async (req, res) => {
  try {
 // Consulta ao banco de dados para obter o histórico de batalhas do perdedor e vencedor, data e empates
    const { rows } = await pool.query(
      "SELECT h.nome AS vencedor, h2.nome AS perdedor, data FROM historico JOIN herois h ON h.id = historico.vencedor JOIN herois h2 ON h2.id = historico.perdedor;"
    );
// Resposta com o histórico de batalhas
    res.status(200).send({
      message: "Histórico de batalhas encontrado com sucesso!",
      historico: rows,
    });
  } catch (error) {
// Tratamento de erros
    console.error("Erro ao buscar histórico", error);
    res.status(500).send("Erro ao buscar histórico");
  }
});
