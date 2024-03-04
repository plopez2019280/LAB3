import { response, request } from "express";
import Enterprise from './empresa.model.js';
import { existeEmpresaByName } from "../helpers/db-validators.js";
import Excel from 'exceljs';

export const enterprisePost = async (req = request, res = response) => {
    const { nameEnterprise, levelImpact, experienceYear, categoryEnterprise } = req.body;
    const enterprise = new Enterprise({ nameEnterprise, levelImpact, experienceYear, categoryEnterprise });
    console.log(enterprise);

    await enterprise.save();
    res.status(200).json({
        enterprise
    });
}

export const EnterprisePut = async (req, res) => {
    const { id } = req.params;
    const { nameEnterprise, levelImpact, categoryEnterprise, experienceYear } = req.body;
    try {
        if (nameEnterprise) {
            await existeEmpresaByName(nameEnterprise);
        }
        if (categoryEnterprise) {
            const categoriasExistentes = [
                'Entertainment', 'Food', 'Transport'
            ];
            if (!categoriasExistentes.includes(categoryEnterprise)) {
                throw new Error(`The enterprise category "${categoryEnterprise}" is not valid. It has to be one of the following: ${categoriasExistentes.join(", ")}`);
            }
        }
        if (levelImpact) {
            const categoriasExistentesss = [
                'High', 'Medium', 'Low'
            ];
            if (!categoriasExistentesss.includes(levelImpact)) {
                const mensajeError = `The impact level has to be one of the following: ${categoriasExistentesss.join(', ')}.`;
                throw new Error(mensajeError);
            }
        }
        const updatedFields = { nameEnterprise, levelImpact,categoryEnterprise, experienceYear };
        await Enterprise.findByIdAndUpdate(id, updatedFields);
        const empresaActualizada = await Enterprise.findOne({ _id: id });
        res.status(200).json({
            msg: '-The enterprise was successfully updated!-',
            empresa: empresaActualizada
        });
    } catch (error) {
        console.error('Error updating enterprise:', error);
        res.status(400).json({ error: error.message });
    }
};

export const obtenerEmpresas = async (req, res) => {
    const { order } = req.params;
    let sortCriteria = {};

    const descripcionCasos = {
        "1": "Sorting by years of experience ascending means you used case 1",
        "2": "Sorting by years of experience descending means you used case 2",
        "3": "Sorting by ascending category means you used case 3",
        "4": "Sorting by descending category means you used case 4",
        "default": "If you want to change the order of the list, write a number in the route like in this example -> /enterprise/(number)"
    };

    switch (order) {
        case "1":
            sortCriteria["experienceYear"] = 1;
            break;
        case "2":
            sortCriteria["experienceYear"] = -1;
            break;
        case "3":
            sortCriteria["categoryEnterprise"] = 1;
            break;
        case "4":
            sortCriteria["categoryEnterprise"] = -1;
            break;
        default:
            sortCriteria["nameEnterprise"] = 1;
            break;
    }

    try {
        const enterprises = await Enterprise.find().sort(sortCriteria);

        res.status(200).json({
            orden: descripcionCasos[order] || descripcionCasos["default"],
            enterprises,
        });
    } catch (error) {
        console.error("Error getting enterprises:", error);
        res.status(500).json({
            message: "Error getting enterprises",
            error: error.message,
        });
    }
};

export const generateReport = async (req, res) => {

    try {

        const enterprises = await Enterprise.find();
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');
        worksheet.columns = [
            { header: 'Name', key: 'nameEnterprise', width: 30 },
            { header: 'Impact', key: 'levelImpact', width: 20 },
            { header: 'Years of experience', key: 'experienceYear', width: 20 },
            { header: 'Category', key: 'categoryEnterprise', width: 25 },
        ];

        enterprises.forEach(enterprise => {
            worksheet.addRow({
                nameEnterprise: enterprise.nameEnterprise,
                levelImpact: enterprise.levelImpact,
                experienceYear: enterprise.experienceYear,
                categoryEnterprise: enterprise.categoryEnterprise
            })
        });

        const buffer = await workbook.xlsx.writeBuffer();
        res.attachment('report-enterprisesManager.xlsx');
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}