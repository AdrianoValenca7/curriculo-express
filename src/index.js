import "dotenv/config";
import express from "express";
import helmet from "helmet";

const app = express();

app.set("trust proxy", true);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Servidor Curriculo Express executando...");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}!`);
});

export default app;