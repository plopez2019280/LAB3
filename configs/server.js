"use strict";

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import EnterpriseRoutes from '../src/enterprise/empresa.routes.js';
import reporEnter from '../src/enterprise/empresa.report.routes.js';
import adminRoutes from '../src/admin/admin.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.enterprisePath = '/EnterpriseManager/v1/enterprises'
        this.reportPath = '/EnterpriseManager/v1/report';
        this.adminPath = '/EnterpriseManager/v1/admin';
        this.authPath = '/EnterpriseManager/v1/auth';
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.enterprisePath, EnterpriseRoutes);
        this.app.use(this.reportPath, reporEnter);
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.authPath, authRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;