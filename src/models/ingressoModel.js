const pool = require("../config/database");

const getIngressos = async () => {
    const result = await pool.query("SELECT * FROM ingressos");
    return result.rows;
};

const getIngressosById = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.rows[0];
};

const createIngresso = async (ingresso) => {
    const result = await pool.query(
        "INSERT INTO ingressos (nome_evento, local, data_evento, preco, disponibilidade) VALUES ($1, $2, $3, $4) RETURNING *",
        [nome_evento, local, data_evento, preco, disponibilidade]
    );
    return result.rows[0];
};

const updateIngresso = async (id, ingresso) => {
    const result = await pool.query(
        "UPDATE ingressos SET nome_evento = $1, local = $2, data_evento = $3, preco = $4, disponibilidade = $5 WHERE id = $6 RETURNING *",
        [nome_evento, local, data_evento, preco, disponibilidade, id]
    );
    return result.rows[0];
};

const deleteIngresso = async (id) => {
    const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);   
    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado" };
    }
    return { message: "Ingresso deletado com sucesso" };
};

module.exports = { getIngressos, getIngressosById, createIngresso, updateIngresso, deleteIngresso };