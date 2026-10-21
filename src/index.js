import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { sequelize } from "./models/index.js";
import * as routes from "./routes/index.js";

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

app.use("/pessoas", routes.pessoa);
app.use("/formacoes", routes.formacao);
app.use("/experiencias", routes.experiencia);
app.use("/projetos", routes.projeto);
app.use("/habilidades", routes.habilidade);

// rota não encontrada (404)
app.use(notFoundMiddleware);

// middleware global de erro
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Conexão com NeonDB realizada com sucesso!");

    await sequelize.sync();

    console.log("Tabelas sincronizadas com sucesso!");

    app.listen(port, () => {
      console.log(`Servidor executando na porta ${port}!`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error.message);
    process.exitCode = 1;
  }
};

startServer();

export default app;