import { formacaoService, pessoaService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getFormacoes = async (req, res) => {
  const formacoes = await formacaoService.getAllFormacoes();
  return res.status(200).send(formacoes);
};

const getFormacao = async (req, res) => {
  const formacao = await formacaoService.getFormacaoById(
    req.params.formacaoId
  );

  if (!formacao) {
    throw new AppError("Formação não encontrada.", 404);
  }

  return res.status(200).send(formacao);
};

const createFormacao = async (req, res) => {
  const { instituicao, curso, dataInicio, dataFim, pessoaId } =
    req.body || {};

  if (!pessoaId) {
    throw new AppError("O campo pessoaId é obrigatório.", 400);
  }

  const pessoa = await pessoaService.getPessoaById(pessoaId);

  if (!pessoa) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  const formacao = await formacaoService.createFormacao({
    instituicao,
    curso,
    dataInicio,
    dataFim,
    pessoaId,
  });

  return res.status(201).send(formacao);
};

const updateFormacao = async (req, res) => {
  const { instituicao, curso, dataInicio, dataFim, pessoaId } =
    req.body || {};

  if (pessoaId !== undefined) {
    const pessoa = await pessoaService.getPessoaById(pessoaId);

    if (!pessoa) {
      throw new AppError("Pessoa não encontrada.", 404);
    }
  }

  const formacao = await formacaoService.updateFormacao(
    req.params.formacaoId,
    {
      instituicao,
      curso,
      dataInicio,
      dataFim,
      pessoaId,
    }
  );

  if (!formacao) {
    throw new AppError("Formação não encontrada.", 404);
  }

  return res.status(200).send(formacao);
};

const deleteFormacao = async (req, res) => {
  const isDeleted = await formacaoService.deleteFormacao(
    req.params.formacaoId
  );

  if (!isDeleted) {
    throw new AppError("Formação não encontrada.", 404);
  }

  return res.status(204).send();
};

export default {
  getFormacoes,
  getFormacao,
  createFormacao,
  updateFormacao,
  deleteFormacao,
};