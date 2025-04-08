require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/ingressoRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes)
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});