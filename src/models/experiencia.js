const getExperienciaModel = (sequelize, { DataTypes }) => {
  const Experiencia = sequelize.define("experiencia", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
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

  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa, {
      foreignKey: "pessoaId",
    });
  };

  return Experiencia;
};

export default getExperienciaModel;