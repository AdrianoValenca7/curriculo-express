import { Router } from "express";
import { formacaoController } from "../controllers/index.js";

const router = Router();

router.get("/", formacaoController.getFormacoes);
router.get("/:formacaoId", formacaoController.getFormacao);
router.post("/", formacaoController.createFormacao);
router.put("/:formacaoId", formacaoController.updateFormacao);
router.delete("/:formacaoId", formacaoController.deleteFormacao);

export default router;