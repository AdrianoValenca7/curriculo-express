import models from "../models/index.js";

const getAllHabilidades = async () => {
  return await models.Habilidade.findAll();
};

const getHabilidadeById = async (id) => {
  return await models.Habilidade.findByPk(id);
};

const createHabilidade = async ({
  nome,
  nivel,
  categoria,
  pessoaId,
}) => {
  return await models.Habilidade.create({
    nome,
    nivel,
    categoria,
    pessoaId,
  });
};

const updateHabilidade = async (
  id,
  { nome, nivel, categoria, pessoaId }
) => {
  const habilidade = await getHabilidadeById(id);

  if (!habilidade) {
    return null;
  }

  return await habilidade.update({
    ...(nome !== undefined && { nome }),
    ...(nivel !== undefined && { nivel }),
    ...(categoria !== undefined && { categoria }),
    ...(pessoaId !== undefined && { pessoaId }),
  });
};

const deleteHabilidade = async (id) => {
  const count = await models.Habilidade.destroy({
    where: { id },
  });

  return count > 0;
};

export default {
  getAllHabilidades,
  getHabilidadeById,
  createHabilidade,
  updateHabilidade,
  deleteHabilidade,
};