import express from "express";
const router = express.Router();
import passport from "passport";

//Logout
router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

//Passport
router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin"
}), async (req, res) => {
    if (!req.user) {
        return res.status(400).send("Credenciales Invalidas");
    };

    req.session.login = true;
    res.redirect("/profile");
})

router.get("/faillogin", async (req, res) => {
    res.send("Error en el login");
})

//Github
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async (req, res) => {
    req.session.user = req.user; 
    req.session.login = true; 
    res.redirect("/profile");
})


export default router;