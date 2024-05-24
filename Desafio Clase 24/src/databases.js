import mongoose from "mongoose";

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse53130:coderhouse@cluster0.ilnzaje.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado a la Base de Datos"))
    .catch((error) => console.log("Problema al conectar: ", error))