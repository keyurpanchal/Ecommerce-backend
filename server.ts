import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import authRoutes from './src/routes/auth.routes';
import cartRoutes from './src/routes/cart.routes';
import orderRoutes from './src/routes/order.routes';
import productRoutes from './src/routes/product.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.CONNECTION_STRING as string).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);



