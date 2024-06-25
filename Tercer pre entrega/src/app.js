import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";

import _dirname from "./utils.js";

import config from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import MongoSingleton from "./config/mongodb-singleton.js";

import producRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import userViewRouter from "./routes/users.views.router.js";
import sessionRouter from "./routes/sessions.router.js";
import githubLoginViewRouter from "./routes/github-login.views.router.js";

import jwtRouter from "./routes/jwt.router.js";
import userRouter from "./routes/users.router.js";

const app = express();
app.use(cors());

const PORT = config.port;
const MONGO_URL = config.mongoUrl;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));

app.use(cookieParser("ClavePrivada"));

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
            ttl: 100,
        }),
        secret: "SECRET",
        resave: false,
        saveUninitialized: true,
    })
);

//Motor de plantillas
app.set("views", path.join(_dirname, "views"));

app.engine(
    ".hbs",
    exphbs.engine({
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        defaultLayout: "main",
        extname: ".hbs",
    })
);

app.set("view egine", ".hbs");

//Middlewares para Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Endpoints
app.use("/", viewsRouter);
app.use("/api/products", producRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/session", sessionRouter);
app.use("/users", userViewRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/email", emailRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`escuchando en el puerto: ${PORT}`);
})

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
};