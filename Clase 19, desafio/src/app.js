const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store");

const fileStore = FileStore(session);
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const app = express(); 
const PUERTO = 8080;
require("../database.js");


app.use(express.json()); 
app.use(cookieParser());
app.use(session({
    secret:"secretCoder",
    resave: true, 
    saveUninitialized:true,
}))

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);


app.get("/crearcuki", (req, res) => {
    res.cookie("cuki", "Esto es una cuki").send("Cuki creada");
})


app.get("/borrarcuki", (req, res) => {
    res.clearCookie("Cuki").send("Cuki eliminada exitosamente");
})


app.get("/login", (req, res) => {
    let usuario = req.query.usuario; 

    req.session.usuario = usuario; 
    res.send("Usuario guardado");
})

//Verificamos el usuario:

app.get("/usuario", (req, res) => {
    if(req.session.usuario) {
        return res.send(`Usuario registrado: ${req.session.usuario} `);
    }
    res.send("No hay un usuario registrado");
})




app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});