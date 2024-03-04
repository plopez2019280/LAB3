import EnterpriseModel from '../enterprise/empresa.model.js';

export const categoryExiste = async (category = '') => {
    const categoriasExistentes = [
        'Entertainment', 'Food', 'Transport'
    ];

    if (!categoriasExistentes.includes(category)) {
        const mensajeError = `The category has to be one of the following: ${categoriasExistentes.join(', ')}.`;
        throw new Error(mensajeError);
    }


}

export const levelImExiste = async (levelImpact = '') => {
    const categoriasExistentes = [
        'High', 'Medium', 'Low'
    ];

    if (!categoriasExistentes.includes(levelImpact)) {
        const mensajeError = `the impact level has to be one of the following: ${categoriasExistentes.join(', ')}.`;
        throw new Error(mensajeError);
    }


}


export const existeEmpresaByName = async (name = '') => {
    const tituloMin = name.toLowerCase();

    const existeTittle = await EnterpriseModel.findOne({
        name: {
            $regex: new RegExp(`^${tituloMin}$`, 'i')
        }
    });

    if (existeTittle) {
        throw new Error(`the name ${name} already exists`);
    }
}


import Admin from '../admin/admin.model.js'

export const adminExistsByEmail = async (email = '') => {
    const correoAdminMin = email.toLowerCase();

    const existCorreo = await Admin.findOne({
        email: {
            $regex: new RegExp(`^${correoAdminMin}$`, 'i')
        }
    });

    if(existCorreo){
        throw new Error(`-The admin with this email: ${email} already exists`);
    }
}