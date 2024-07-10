import { Request, Response } from 'express';
import Product from '../models/product.model';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageURL } = req.body;
    const product = new Product({ name, description, price, imageURL });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageURL } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, imageURL }, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
