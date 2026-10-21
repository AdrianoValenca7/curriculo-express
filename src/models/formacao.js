const getFormacaoModel = (sequelize, { DataTypes }) => {
  const Formacao = sequelize.define("formacao", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    pessoaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Formacao.associate = (models) => {
    Formacao.belongsTo(models.Pessoa, {
      foreignKey: "pessoaId",
    });
  };

  return Formacao;
};

export default getFormacaoModel;