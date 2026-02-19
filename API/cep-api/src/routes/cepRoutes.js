import { Router } from 'express';
import CepController from '../controllers/cepController.js';

const router = Router();
const cepController = new CepController();

const setCepRoutes = () => {
    router.get('/api/cep/:cep', cepController.getAddressByCep.bind(cepController));
    return router;
};

export default setCepRoutes;