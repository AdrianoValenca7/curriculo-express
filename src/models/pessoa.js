const getPessoaModel = (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define("pessoa", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resumo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Pessoa.associate = (models) => {
  Pessoa.hasMany(models.Formacao, {
    foreignKey: "pessoaId",
    onDelete: "CASCADE",
  });

  Pessoa.hasMany(models.Experiencia, {
    foreignKey: "pessoaId",
    onDelete: "CASCADE",
  });

  Pessoa.hasMany(models.Projeto, {
    foreignKey: "pessoaId",
    onDelete: "CASCADE",
  });
};

  return Pessoa;
};

export default getPessoaModel;