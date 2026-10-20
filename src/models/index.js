import { Sequelize, DataTypes } from "sequelize";
import getPessoaModel from "./pessoa.js";

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
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;