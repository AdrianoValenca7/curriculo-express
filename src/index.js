import "dotenv/config";
import express from "express";
import helmet from "helmet";

import {
  corsMiddleware,
  logMiddleware,
  contextMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);
app.use(contextMiddleware);

// rotas
app.get("/", (req, res) => {
  return res.send("Servidor Curriculo Express executando...");
});

// rota não encontrada (404)
app.use(notFoundMiddleware);

// middleware global de erro
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}!`);
});

export default app;