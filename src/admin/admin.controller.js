import bcrypt from 'bcryptjs';
import Admin from './admin.model.js';

export const registrarUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el correo electrónico ya está en uso
        const existeUsuario = await Admin.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new Admin({
            name,
            email,
            password
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        nuevoUsuario.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
