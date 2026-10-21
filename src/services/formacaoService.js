import models from "../models/index.js";

const getAllFormacoes = async () => {
  return await models.Formacao.findAll();
};

const getFormacaoById = async (id) => {
  return await models.Formacao.findByPk(id);
};

const createFormacao = async ({
  instituicao,
  curso,
  dataInicio,
  dataFim,
  pessoaId,
}) => {
  return await models.Formacao.create({
    instituicao,
    curso,
    dataInicio,
    dataFim,
    pessoaId,
  });
};

const updateFormacao = async (
  id,
  { instituicao, curso, dataInicio, dataFim, pessoaId }
) => {
  const formacao = await getFormacaoById(id);

  if (!formacao) {
    return null;
  }

  return await formacao.update({
    ...(instituicao !== undefined && { instituicao }),
    ...(curso !== undefined && { curso }),
    ...(dataInicio !== undefined && { dataInicio }),
    ...(dataFim !== undefined && { dataFim }),
    ...(pessoaId !== undefined && { pessoaId }),
  });
};

const deleteFormacao = async (id) => {
  const count = await models.Formacao.destroy({
    where: { id },
  });

  return count > 0;
};

export default {
  getAllFormacoes,
  getFormacaoById,
  createFormacao,
  updateFormacao,
  deleteFormacao,
};