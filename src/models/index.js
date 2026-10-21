import { Sequelize, DataTypes } from "sequelize";
import getPessoaModel from "./pessoa.js";
import getFormacaoModel from "./formacao.js";
import getExperienciaModel from "./experiencia.js";
import getProjetoModel from "./projeto.js";
import getHabilidadeModel from "./habilidade.js";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
});

const models = {
  Pessoa: getPessoaModel(sequelize, { DataTypes }),
  Formacao: getFormacaoModel(sequelize, { DataTypes }),
  Experiencia: getExperienciaModel(sequelize, { DataTypes }),
  Projeto: getProjetoModel(sequelize, { DataTypes }),
  Habilidade: getHabilidadeModel(sequelize, { DataTypes }),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;