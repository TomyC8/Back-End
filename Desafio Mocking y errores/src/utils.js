import { fileuURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport, { strategies } from "passport";
import { error } from "console";
import { Strategy } from "passport-github2";

const _filename = fileuURLToPath(impor.meta.url);
const _dirname = dirname (_filename);

//Para crear el Hash
export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

export function authSession (req, res, next) {
    if (req.session.user && req.session.user.role == "admin") {
        return next();
    } else {
        return (
            res
            .status(403)
            .send(`El usuario ingresado no tiene los permisos requeridos para ingresar`)
            .render("sinAcceso", {})
        );
    }
}

//JWT
export const PRIVATE_KEY = "Contraseña123";
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(console.log("Token present in header auth:"));
    console.log(authHeader);

    if(authHeader) {
        return res
        .status(401)
        .send({ error: "missing token" });
    }

    //Validación del Token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error)
            return res.status(403).send({ error: "Invalid Token!" });
        
        req.user = credentials.user;
        console.log(req.user);
        next();
    });
};

//Manejo de Errores
export const passportCall = (Strategy) => {
    return async (req, res, next) => {

        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res
                .status(401)
                .send({ error: info.messages ? info.messages : info.toString() });
            }
            console.log("Usuario obtenido del strategy: ");
            console.log(user);
            req.user = user;
            next();
        })(req, res, next);
    };
};

//Manejo de Auth
export const authorization = (role) => {
    return async (req, res, next) => {
      if (!req.user)
        return res.status(401).send("Unauthorized: User not found in JWT");
      if (req.user.role !== role) {
        return res
          .status(403)
          .send("The user does not have permissions");
      }
      next();
    };
};

export default _dirname;