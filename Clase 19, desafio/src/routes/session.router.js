const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");


router.post("/sessionlogin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await UserModel.findOne({email: email});

        if (usuario) {
            if (usuario.password === password) {
                req.session.login = true;
                res.status(200).send({message: "Login encontrado"});
            } else {
                res.status(401).send({error: "La contraseña no es correcta"});
            }
        } else {
            res.status(404).send({error: "Usuario no encontrado"});
        }

    } catch (error) {
        res.status(400).send({error: "Error en el login"});
    }
})

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.status(200).send({message: "Login eliminado"});
})

module.exports = router;