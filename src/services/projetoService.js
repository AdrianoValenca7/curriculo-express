import models from "../models/index.js";

const getAllProjetos = async () => {
  return await models.Projeto.findAll();
};

const getProjetoById = async (id) => {
  return await models.Projeto.findByPk(id);
};

const createProjeto = async ({
  nome,
  descricao,
  tecnologias,
  link,
  pessoaId,
}) => {
  return await models.Projeto.create({
    nome,
    descricao,
    tecnologias,
    link,
    pessoaId,
  });
};

const updateProjeto = async (
  id,
  { nome, descricao, tecnologias, link, pessoaId }
) => {
  const projeto = await getProjetoById(id);

  if (!projeto) {
    return null;
  }

  return await projeto.update({
    ...(nome !== undefined && { nome }),
    ...(descricao !== undefined && { descricao }),
    ...(tecnologias !== undefined && { tecnologias }),
    ...(link !== undefined && { link }),
    ...(pessoaId !== undefined && { pessoaId }),
  });
};

const deleteProjeto = async (id) => {
  const count = await models.Projeto.destroy({
    where: { id },
  });

  return count > 0;
};

export default {
  getAllProjetos,
  getProjetoById,
  createProjeto,
  updateProjeto,
  deleteProjeto,
};