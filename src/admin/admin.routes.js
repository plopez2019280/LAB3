import { Router } from "express";
import { check } from "express-validator";
import { registrarUsuario } from "./admin.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { adminExistsByEmail } from "../helpers/db-validators.js";

const admin = Router();

admin.post(
    "/",
    [
        check("name", "the name is obligatory").not().isEmpty(),
        check("email", "the email is obligatory").isEmail(),
        check("password", "The password must be least 6 characters").isLength({ min: 6, }),
        check('email').custom(adminExistsByEmail),
        validarCampos
    ],
    registrarUsuario
);

export default admin;