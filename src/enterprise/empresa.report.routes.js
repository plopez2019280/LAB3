import { Router } from "express";
import { validarCampos } from "../middlewares/validarCampos.js";
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