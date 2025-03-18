const ingressoModel = require("../models/ingressoModel");

const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngressos();
        res.status(200).json(ingressos);
    } catch (error) {
        res.status(404).json ({ message: "Ingressos não encontrados" });
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
        const { nome_evento, local, data_evento, preco, disponibilidade } = req.body;
        const newIngresso = await ingressoModel.createIngresso(nome_evento, local, data_evento, preco, disponibilidade);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.log(error);
        if (error.code === "23505")
            return res.status(400).json({ message: "Ingresso já cadastro"});
    }
    res.status(500).json({ message: "Erro ao criar ingresso" });
};

const updateIngresso = async (req, res) => {
    try {
        const { nome_evento, local, data_evento, preco, disponibilidade } = req.body;
        const ingresso = await ingressoModel.updateIngresso(req.params.id, nome_evento, local, data_evento, preco, disponibilidade);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado" });
        }
    } catch (error) {
        res.status(500).json ({ message: "Erro ao atualizar ingresso"});
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

module.exports = { getAllIngressos, getIngressos, createIngresso, updateIngresso, deleteIngresso };