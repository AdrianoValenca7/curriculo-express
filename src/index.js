import "dotenv/config";

import app from "./app.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com NeonDB realizada com sucesso!");

    await sequelize.sync();
    console.log("Tabelas sincronizadas com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor executando na porta ${PORT}!`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exitCode = 1;
  }
};

iniciarServidor();