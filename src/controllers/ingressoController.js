const ingressoModel = require("../models/ingressoModel");
const pool = require("../config/database");

const getAllIngressos = async (req, res) => {
    try {
        const {evento} = req.query;
        const ingressos = await ingressoModel.getAllIngressos(evento);
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar Ingressos." });
    }
};

const getIngressos = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressosById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado" });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(404).json ({ message: "Erro ao buscar ingresso"});
    }
};

const createIngresso = async (req, res) => {
    try {
        const ingresso = req.body;

    
        const result = await ingressoModel.createIngresso(ingresso);
    
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_evento, local_evento, data_evento, preco, categoria, quantidade_ingressos } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID do ingresso não fornecido" });
        }

        const result = await pool.query(
            "UPDATE ingressos SET nome_evento = $1, local_evento = $2, data_evento = $3, preco = $4, categoria = $5, quantidade_ingressos = $6 WHERE id = $7 RETURNING *",
            [nome_evento, local_evento, data_evento, preco, categoria, quantidade_ingressos, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Ingresso não encontrado" });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.deleteIngresso(req.params.id);
        res.json(ingresso);
    } catch (error) {
        res.status(404).json({ message: "Erro ao deletar ingresso" });
    }
};

const createVenda = async (req, res) => {
    try {
        const { id_ingresso, id_quantidade } = req.body;
        const newVenda = await ingressoModel.createVenda(id_ingresso, id_quantidade);
        res.status(201).json(newVenda);
    } catch (error) {
        console.error("Erro ao criar venda:", error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "Venda já cadastrada" });
        }
        res.status(500).json({ message: "Erro ao criar venda" });
    }
};

const buscarIngressos = async (req, res) => {
    try {
        const { evento } = req.query;
        const ingressos = await ingressoModel.getIngressos(evento);
        res.status(200).json(ingressos);
    } catch (error) {
        console.error("Erro ao buscar ingressos:", error);
        res.status(500).json({ message: "Erro ao buscar ingressos." });
    }
};

module.exports = {
    buscarIngressos,
    getIngressos,
    createIngresso,
    updateIngresso,
    deleteIngresso,
    createVenda
};