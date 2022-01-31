import {Schema, model} from 'mongoose';
import {Customer} from '../interfaces/customer';

const schema = new Schema<Customer>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mobile: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  customerID: {
    type: String,
    required: true,
  },
});

const CustomerModel = model<Customer>('customer', schema);

export {CustomerModel};
