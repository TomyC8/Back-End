// Usamos Jsonwebtoken

import express from "express";
import "./databases.js";

const app = express();
const Puerto = 8080;

// Rutas
app.get("/", (req, res) => {
    res.send()
})

app.listen(Puerto, () => {
    console.log(`Escuchando en el puerto ${Puerto}`)
})