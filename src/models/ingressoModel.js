const express = require("express");
const app = express();


app.use(express.json());

const pool = require("../config/database");
const ingressoModel = require("../models/ingressoModel");

const getIngressos = async () => {
    try {
        console.log('Tentando buscar ingressos...');
        const result = await pool.query('SELECT * FROM ingressos');
        console.log('Ingressos encontrados:', result);
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar ingressos:', error.message);
        throw error;
    }
};

const getIngressosById = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.rows[0];
};

const createIngresso = async (ingresso) => {
    const { nome_evento, local_evento, data_evento, preco, categoria, quantidade_ingressos } = ingresso;

    
    if (!nome_evento || !local_evento || !data_evento || !preco || !categoria || quantidade_ingressos == null) {
        return { error: "Todos os campos obrigatórios devem ser preenchidos" };
    }

    
    if (categoria === "Pista" && preco < 100) {
        return { error: "Preço inválido para categoria Pista" };
    } else if (categoria === "Pista VIP" && preco < 200) {
        return { error: "Preço inválido para categoria Pista VIP" };
    } else if (categoria === "Camarote" && preco < 300) {
        return { error: "Preço inválido para categoria Camarote" };
    } else if (categoria === "Arquibancada" && preco < 400) {
        return { error: "Preço inválido para categoria Arquibancada" };
    }

    const result = await pool.query(
        "INSERT INTO ingressos (nome_evento, local_evento, data_evento, preco, categoria, quantidade_ingressos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [nome_evento, local_evento, data_evento, preco, categoria, quantidade_ingressos]
    );
    return result.rows[0];
};

const updateIngresso = async (req, res) => {
    try {
        const id = req.params.id;
        const ingresso = req.body;

        const result = await ingressoModel.updateIngresso(id, ingresso);

        if (result.error) {
            return res.status(404).json({ error: result.error });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const deleteIngresso = async (id) => {
    const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);   
    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado" };
    }
    return { message: "Ingresso deletado com sucesso" };
};

const createVenda = async (id_ingresso, id_quantidade) => {
    const result = await pool.query(
        "UPDATE ingressos SET quantidade_ingressos = quantidade_ingressos - $1 WHERE id = $2 RETURNING *",
        [id_quantidade, id_ingresso]
    );
    return { message: "Venda realizada com sucesso" };
};

module.exports = { getIngressos, getIngressosById, createIngresso, updateIngresso, deleteIngresso, createVenda };