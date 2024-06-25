import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "jsonwebtoken";
import userModel from "./dao/DB/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import { PRIVATE_KEY } from "../utils.js";

const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT =jwtStrategy.ExtractJwt;

const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clienID: "Iv23liwJ0ilHnZMzwzsV",
                clientSecret: "f1747bc0d3847dece8c1f9a35c4979aba002dfa8",
                callbackURL: "http://localhost:8080/api/sessions/githubcallback"
            }, 
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userModel.findOne({ email: profile._json.email});

                    if (!user) {
                        let newUser = {
                            firts_name: profile._json.name,
                            last_name: "",
                            age: 36,
                            email: profile._json.name,
                            password: "",
                            loggedBy: "Github",
                        };
                        
                        const result = await userModel.create(newUser);
                        return done(null, result);
                    } else {
                        return done(null, user);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    )
};

//Estrategia para obtener el token Jwt por cookie
passport.use(
    "jwt",
    new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKer: PRIVATE_KEY,
    },
    async (jwt_payload, done) => {
        console.log("Entrando a passport strategy con Jwt");
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    })
);

// Estrategia para registrarse
passport.use("register", new localStrategy({ passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
        const { firts_name, last_name, email, age, role } = req.body;
        try {
            const exists = await userModel.findOne({ email });
            if (exists) {
                console.log("The user exists");
                return done(null, false);
            }
            const user = {
                firts_name,
                last_name,
                email,
                age,
                role,
                password: createHash(password),
            };
            const result = await userModel.create(user);
            return done(null, result); //Si todo sale bien, pasa esto
        } catch (error) {
            return done("Error registering user: " + error);
        }
    }
));

// Estrategia para el login
passport.use("login", new localStrategy({ passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
        const { firts_name, last_name, email, age, role } = req.body;
        try {
            const user = await userModel.findOne({ username });
            if (!user) {
                console.warn("Invalid credentials for user: " + username);
                return done(null, false);
            }
            if(!isValidPassword(user, password)) {
                console.warn("Invalid credentials for user: " + username);
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Para el current
passport.use("current", new localStrategy({ passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            req.session.user;
            if (!user) {
                console.warn("Invalid credential for user: " + username);
                return done(null, false)
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.deserializeUser(async (id, done) => {
    try {
        let user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        console.error("Error deserializando el usuario: " + error);
    };
})

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwtCookieToken"];
    }
    return token;
}

export default initializePassport;