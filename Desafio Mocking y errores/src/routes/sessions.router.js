import { Router } from "express";
import passport, { use } from "passport";
import { generateJWToken } from "../utils";

const router = Router();

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:mail"] }),
    async (req, res) => {}
);

router.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/github/error"}),
    async (req, res) => {
        const user = req.user;
        req.session.user = {
            name: `${user.firts_name} ${user.last_name}`,
            email: user.email,
            age: use.age,
        };
        req.session.admin = true;
        res.redirect ("/github");
    }
);

router.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/api/sessions/fail-register", }),
        async (req, res) => {
            console.log("Registering new user");
            res
            .status(201)
            .send({ status: "success", message: "user created successfully"});
        }
);

router.post(
    "/login", 
    passport.authenticate("login", {
        failureRedirect: "/api/sessions/fail-login", }),
        async (req, res) => {
            console.log("User found to login:");
            const user = req.user;
            console.log(user);
            if (!user)
                return res.status(401).send({
            status: "error",
            error: "username and password do not match"
        });

        const acces_Token = generateJWToken(user);
        res.send({ access_token: acces_Token});
    }
);

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
  });
  
  router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
  });
  
  router.get("/logout", (req, res) => {
    const user = req.session.user;
    req.session.destroy((err) => {
      if (err) {
        return res.json({ status: "Error", body: err });
      }
      res
        .clearCookie("connect.sid")
        // .send(`session finalizada correctamente ${user}.`);
        .render("login", {});
    });
  });
  
  router.get("/session", (req, res) => {
    if (req.session.counter) {
      req.session.counter++;
      res.send(`Bienvenido nuevamente, usted ingreso: ${req.session.counter} veces.`
      );
    } else {
      req.session.counter = 1;
      res.send(`Welcome, this is your first time entering`);
    }
  });
  
  export default router;