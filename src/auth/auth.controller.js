import bcryptjs from "bcryptjs";
import Usuario from "../admin/admin.model.js";
import { generarJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Incorrect credentials - this email does not exists in the database",
      });
    }
    if (!usuario.isActive) {
      return res.status(400).json({
        msg: "Incorrect credentials - this user does not exists in the database",
      });
    }
    const validPassword = bcryptjs.compare(password, Usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      msg: "Login",
      usuario,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Contact administrator",
    });
  }
};