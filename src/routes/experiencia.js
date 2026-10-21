import { Router } from "express";
import { experienciaController } from "../controllers/index.js";

const router = Router();

router.get("/", experienciaController.getExperiencias);
router.get("/:experienciaId", experienciaController.getExperiencia);
router.post("/", experienciaController.createExperiencia);
router.put("/:experienciaId", experienciaController.updateExperiencia);
router.delete("/:experienciaId", experienciaController.deleteExperiencia);

export default router;