import {
  experienciaService,
  pessoaService,
} from "../services/index.js";

import { AppError } from "../utils/index.js";

const getExperiencias = async (req, res) => {
  const experiencias = await experienciaService.getAllExperiencias();
  return res.status(200).send(experiencias);
};

const getExperiencia = async (req, res) => {
  const experiencia = await experienciaService.getExperienciaById(
    req.params.experienciaId
  );

  if (!experiencia) {
    throw new AppError("Experiência não encontrada.", 404);
  }

  return res.status(200).send(experiencia);
};

const createExperiencia = async (req, res) => {
  const {
    empresa,
    cargo,
    descricao,
    dataInicio,
    dataFim,
    pessoaId,
  } = req.body || {};

  if (!pessoaId) {
    throw new AppError("O campo pessoaId é obrigatório.", 400);
  }

  const pessoa = await pessoaService.getPessoaById(pessoaId);

  if (!pessoa) {
    throw new AppError("Pessoa não encontrada.", 404);
  }

  const experiencia = await experienciaService.createExperiencia({
    empresa,
    cargo,
    descricao,
    dataInicio,
    dataFim,
    pessoaId,
  });

  return res.status(201).send(experiencia);
};

const updateExperiencia = async (req, res) => {
  const {
    empresa,
    cargo,
    descricao,
    dataInicio,
    dataFim,
    pessoaId,
  } = req.body || {};

  if (pessoaId !== undefined) {
    const pessoa = await pessoaService.getPessoaById(pessoaId);

    if (!pessoa) {
      throw new AppError("Pessoa não encontrada.", 404);
    }
  }

  const experiencia = await experienciaService.updateExperiencia(
    req.params.experienciaId,
    {
      empresa,
      cargo,
      descricao,
      dataInicio,
      dataFim,
      pessoaId,
    }
  );

  if (!experiencia) {
    throw new AppError("Experiência não encontrada.", 404);
  }

  return res.status(200).send(experiencia);
};

const deleteExperiencia = async (req, res) => {
  const isDeleted = await experienciaService.deleteExperiencia(
    req.params.experienciaId
  );

  if (!isDeleted) {
    throw new AppError("Experiência não encontrada.", 404);
  }

  return res.status(204).send();
};

export default {
  getExperiencias,
  getExperiencia,
  createExperiencia,
  updateExperiencia,
  deleteExperiencia,
};