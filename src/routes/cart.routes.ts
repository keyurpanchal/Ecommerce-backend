// src/routes/cart.routes.ts
import { Router } from 'express';
import { addToCart, viewCart, updateCart, removeFromCart } from '../controllers/cart.controller';
import authMiddleware from '../middlewares/auth.middleware';

const cartRoutes = Router();

cartRoutes.post('/add', authMiddleware, addToCart);
cartRoutes.get('/', authMiddleware, viewCart);
cartRoutes.put('/update', authMiddleware, updateCart);
cartRoutes.delete('/remove', authMiddleware, removeFromCart);

export default cartRoutes;
