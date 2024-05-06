const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "herois",
    password: "ds564",
    port: 7007,
});

app.get("/herois", async (req, res) => {
    const result = await pool.query("SELECT * FROM herois");
    return res.json(result.rows);
});