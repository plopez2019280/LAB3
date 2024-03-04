import { Router } from "express";
const routerEnterprise = Router();
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { EnterprisePut, enterprisePost, obtenerEmpresas } from "./empresa.controller.js";
import { categoryExiste, levelImExiste } from "../helpers/db-validators.js";

routerEnterprise.post(
    '/',
    [
        check("nameEnterprise", "you have to put a name first").not().isEmpty(),
        check("categoryEnterprise").custom(categoryExiste),
        check("levelImpact").custom(levelImExiste),
        validarCampos
    ],
    enterprisePost

);

routerEnterprise.put(
    '/:id',
    [
        validarCampos
    ],
    EnterprisePut
);

routerEnterprise.get("/:order?",
    [
        validarCampos
    ],
    obtenerEmpresas
);

export default routerEnterprise;