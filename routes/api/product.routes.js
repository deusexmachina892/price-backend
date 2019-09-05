import { Router } from 'express';
import ProductController from '../../controllers/product.controller';

// These are valid routes but they may contain a bug, please try to define and fix them 

const router = Router();
router.get('/products', ProductController.getAllProducts);
router.get('/products/:product_id', ProductController.getProduct);
router.get('/products/:product_id/prices', ProductController.getAllPricesForProduct);
router.post('/products', ProductController.create);
router.post('/products/:product_id/prices', ProductController.createPrices);

export default router;