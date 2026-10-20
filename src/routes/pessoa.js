import { Router } from "express";
import { pessoaController } from "../controllers/index.js";

const router = Router();

router.get("/", pessoaController.getPessoas);
router.get("/:pessoaId", pessoaController.getPessoa);
router.post("/", pessoaController.createPessoa);
router.put("/:pessoaId", pessoaController.updatePessoa);
router.delete("/:pessoaId", pessoaController.deletePessoa);

export default router;