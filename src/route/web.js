import express from 'express';
import authController from '../controller/authController';

let router = express.Router();

let initWebRouters = (app) => {
    // Auth
    router.post('/api/v1/register', authController.handleRegister);
    router.post('/api/v1/login', authController.handleLogin);

    // Doctor

    return app.use('/', router);
};

module.exports = initWebRouters;
