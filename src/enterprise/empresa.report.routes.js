import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { generateReport } from "./empresa.controller.js";
const rutaReport = Router();

rutaReport.get(
    "/",
    [
        validarCampos
    ],
    generateReport
)

export default rutaReport;