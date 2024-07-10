import { Schema, model, Document } from 'mongoose';

interface IOrderItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  createdAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;
