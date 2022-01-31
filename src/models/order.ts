import {Schema, model} from 'mongoose';
import {Order} from '../interfaces/order';

const schema = new Schema<Order>({
  productName: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    minimum: 1,
    description: 'Must be a number greater than 0',
  },

  pricing: {
    type: Number,
    required: true,
    validate: [pricingValidator, 'Pricing should not be greater than MRP'],
  },

  mrp: {
    type: Number,
    required: true,
  },

  purchaseOrderID: {
    type: String,
    required: true,
  },

  customerID: {
    type: String,
    required: true,
  },
});

function pricingValidator(this: Order, value: number) {
  return this?.mrp >= value;
}

const OrderModel = model<Order>('order', schema);

export {OrderModel};
