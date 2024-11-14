
require("dotenv").config();

const db = require("./db"); 

const express = require("express");

const app = express();

// Habilitar o CORS para permitir requisições de outros domínios
const cors = require("cors");
app.use(cors());

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// rota de CADASTRO
app.post("/clientes", async (req, res) => {
    const customer = req.body;
    try {
        await db.insertCustomer(customer);
        res.sendStatus(201);
    } catch (error) {
        console.error("Erro ao inserir cliente:", error);
        res.sendStatus(500);
    }
});


// rota para Atualizar
app.patch("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const customer = req.body;
    await db.updateCustomer(id, customer);
    res.sendStatus(200);     
})

// rota para Delete
app.delete("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.deleteCustomer(id);
    res.sendStatus(204); 
})


// rota para listar clientes
app.get("/clientes", async (req, res) => {
    const results = await db.selectCustomers()
    res.json(results);
}) 

app.get("/clientes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const results = await db.selectCustomer(id);
    if (!results.length) {
        return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(results[0]);
});


app.get("/", (req, res, next) => {
    res.json({
        message: "It is alive!"
    })
})

app.listen(process.env.PORT, () => {
    console.log('App rodando agora!!!');
})