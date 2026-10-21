import express from "express";
import helmet from "helmet";

import * as routes from "./routes/index.js";

import {
  corsMiddleware,
  logMiddleware,
  contextMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware);
app.use(contextMiddleware);

app.get("/", (req, res) => {
  return res.status(200).send("Servidor Currículo Express executando...");
});

app.use("/pessoas", routes.pessoa);
app.use("/formacoes", routes.formacao);
app.use("/experiencias", routes.experiencia);
app.use("/projetos", routes.projeto);
app.use("/habilidades", routes.habilidade);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;