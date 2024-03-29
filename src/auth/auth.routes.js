import { Router } from "express";
import { check } from "express-validator";
import validator from 'validator';
import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";


const router = Router();

router.post(
  '/', [
      check('email')
      .notEmpty().withMessage('The Email is required')
      .custom((value, { req }) => {
          if (!validator.isEmail(value)) {
          }
          return true;
      }),
      check('password', 'The Password is required').notEmpty(),
      validarCampos,
  ], login
);
export default router;