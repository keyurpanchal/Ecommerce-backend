// src/routes/order.routes.ts
import { Router } from 'express';
import { placeOrder, getOrders, getAllOrders } from '../controllers/order.controller';
import authMiddleware from '../middlewares/auth.middleware';

const orderRoutes = Router();

orderRoutes.post('/', authMiddleware, placeOrder);
orderRoutes.get('/', authMiddleware, getOrders);
orderRoutes.get('/all', authMiddleware, getAllOrders);

export default orderRoutes;
