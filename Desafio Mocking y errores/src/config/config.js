import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
    .option("-d", "variable para debug", false)
    .option("-p <port>", "Puerto del servidor", 9090)
    .option("--mode <mode>", "Modo de trabajo", "develop")
    .option("--persist <mode>", "Modo de persistencia", "mongodb")
    program.parse();

    console.log("Options: ", program.opts());

    const enviroment = program.opts().mode;

    dotenv.config({
        path:
        enviroment === "production"
        ? "./src/config/.env.production"
        : "./src/config/.env.development",
    });

export default {
    port: process.env.PORT,
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
};