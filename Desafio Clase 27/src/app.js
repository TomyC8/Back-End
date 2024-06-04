const express = require("express");
const cors = require("cors");
const productosRouter = require("./routes/productos.router.js");
require("./database.js");

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(cors());


app.use("/productos", productosRouter);

app.listen(PUERTO);