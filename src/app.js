// * En app.js se va a instanciar express
import express from "express";
// import user from "./user/network.js";
import { user, story, auth } from "./components";
import { checkToken } from "./auth";

export const app = express();

// * middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* rutas
// "/" es la raiz previa a las rutas del enrutador, que aqui es network
app.use("/user", checkToken, user);
app.use("/story", checkToken, story);
app.use("/auth", auth);
