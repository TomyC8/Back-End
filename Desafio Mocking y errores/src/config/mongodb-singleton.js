import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectoMongoDB();
    };

    static getInstance() {
        if(this.#instance) {
            console.log("Ya hay una conexión a MongoDb.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    #connectoMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl);
            console.log("Conección exitosa a MongoDB")
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Mongoose: " + error);
            process.exit();
        }
    };
};