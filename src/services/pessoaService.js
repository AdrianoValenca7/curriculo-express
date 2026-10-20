import models from "../models/index.js";

const getAllPessoas = async () => {
  return await models.Pessoa.findAll();
};

const getPessoaById = async (id) => {
  return await models.Pessoa.findByPk(id);
};

const createPessoa = async ({ nome, email, telefone, resumo }) => {
  return await models.Pessoa.create({
    nome,
    email,
    telefone,
    resumo,
  });
};

const updatePessoa = async (id, { nome, email, telefone, resumo }) => {
  const pessoa = await getPessoaById(id);

  if (!pessoa) {
    return null;
  }

  return await pessoa.update({
    ...(nome !== undefined && { nome }),
    ...(email !== undefined && { email }),
    ...(telefone !== undefined && { telefone }),
    ...(resumo !== undefined && { resumo }),
  });
};

const deletePessoa = async (id) => {
  const count = await models.Pessoa.destroy({
    where: { id },
  });

  return count > 0;
};

export default {
  getAllPessoas,
  getPessoaById,
  createPessoa,
  updatePessoa,
  deletePessoa,
};