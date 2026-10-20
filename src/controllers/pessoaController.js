import { pessoaService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getPessoas = async (req, res) => {
  const pessoas = await pessoaService.getAllPessoas();
  return res.status(200).send(pessoas);
};

const getPessoa = async (req, res) => {
  const pessoa = await pessoaService.getPessoaById(req.params.pessoaId);

  if (!pessoa) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  return res.status(200).send(pessoa);
};

const createPessoa = async (req, res) => {
  const { nome, email, telefone, resumo } = req.body || {};

  const pessoa = await pessoaService.createPessoa({
    nome,
    email,
    telefone,
    resumo,
  });

  return res.status(201).send(pessoa);
};

const updatePessoa = async (req, res) => {
  const { nome, email, telefone, resumo } = req.body || {};

  const pessoa = await pessoaService.updatePessoa(req.params.pessoaId, {
    nome,
    email,
    telefone,
    resumo,
  });

  if (!pessoa) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  return res.status(200).send(pessoa);
};

const deletePessoa = async (req, res) => {
  const isDeleted = await pessoaService.deletePessoa(req.params.pessoaId);

  if (!isDeleted) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  return res.status(204).send();
};

export default {
  getPessoas,
  getPessoa,
  createPessoa,
  updatePessoa,
  deletePessoa,
};