import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';
import authMiddleware from '../middlewares/auth.middleware';

const productRoutes = Router();

productRoutes.post('/', authMiddleware, createProduct);
productRoutes.get('/', getProducts);
productRoutes.get('/:id', getProductById);
productRoutes.put('/:id', authMiddleware, updateProduct);
productRoutes.delete('/:id', authMiddleware, deleteProduct);

export default productRoutes;
