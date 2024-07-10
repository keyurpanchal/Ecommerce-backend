import { Request, Response } from 'express';
import Order from '../models/order.model';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import { AuthRequest } from '../middlewares/auth.middleware';

const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const orderItems = cart.items.map(item => {
      const product = item.productId as any;
      return {
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const totalAmount = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const order = new Order({ userId, items: orderItems, totalAmount });
    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error placing order' });
  }
};

const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate('items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export { placeOrder, getOrders, getAllOrders };
