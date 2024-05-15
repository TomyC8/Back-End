import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";

import UsuarioModel from "../models/usuario.model";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;

const initializaPassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
            let usuario = await UsuarioModel.findOne({ email });
            if (usuario) {
                return done(null, false);
            }

            let nuevoUsuario = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let resultado = await UsuarioModel.create(nuevoUsuario);
            return done(null, resultado);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        
        try{ 
            let usuario = await UsuarioModel.findOne({ email });

            if (!usuario) {
                console.log("Usuario inexistente");
                return done(null, false);
            }

            if (!isValidPassword (password, usuario)) {
                return done(null, false);
            }

            return done(null, usuario);

        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.use("github", new GitHubStrategy({
        clientId: Iv23liwJ0ilHnZMzwzsV,
        clientSecret: f1747bc0d3847dece8c1f9a35c4979aba002dfa8,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        
        console.log("Profile:", profile);

        try {
            let usuario = await UsuarioModel.findOne({ email: profile._json.email });

            if (!usuario) {
                let nuevoUsuario = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 36,
                    email: profile._json.email,
                    password: "miau"
                }

                let resultado = await UsuarioModel.create(nuevoUsuario);
                done(null, resultado);
            } else {
                done(null, usuario);
            }
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializaPassport;