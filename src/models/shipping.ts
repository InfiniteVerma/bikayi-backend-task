import {Schema, model} from 'mongoose';
import {Shipping} from '../interfaces/shipping';

const schema = new Schema<Shipping>({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
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

const ShippingModel = model<Shipping>('shipping', schema);

export {ShippingModel};
