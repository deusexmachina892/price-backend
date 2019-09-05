import { Router } from 'express';
import productRoutes from './product.routes';

const routes = Router();

routes.use('/', productRoutes);

export default routes;