import models from "../models/index.js";

const getAllExperiencias = async () => {
  return await models.Experiencia.findAll();
};

const getExperienciaById = async (id) => {
  return await models.Experiencia.findByPk(id);
};

const createExperiencia = async ({
  empresa,
  cargo,
  descricao,
  dataInicio,
  dataFim,
  pessoaId,
}) => {
  return await models.Experiencia.create({
    empresa,
    cargo,
    descricao,
    dataInicio,
    dataFim,
    pessoaId,
  });
};

const updateExperiencia = async (
  id,
  { empresa, cargo, descricao, dataInicio, dataFim, pessoaId }
) => {
  const experiencia = await getExperienciaById(id);

  if (!experiencia) {
    return null;
  }

  return await experiencia.update({
    ...(empresa !== undefined && { empresa }),
    ...(cargo !== undefined && { cargo }),
    ...(descricao !== undefined && { descricao }),
    ...(dataInicio !== undefined && { dataInicio }),
    ...(dataFim !== undefined && { dataFim }),
    ...(pessoaId !== undefined && { pessoaId }),
  });
};

const deleteExperiencia = async (id) => {
  const count = await models.Experiencia.destroy({
    where: { id },
  });

  return count > 0;
};

export default {
  getAllExperiencias,
  getExperienciaById,
  createExperiencia,
  updateExperiencia,
  deleteExperiencia,
};