import {RequestHandler} from 'express';
import {v4 as uuidV4} from 'uuid';
import {CustomerModel} from '../models/customer';

const addCustomer: RequestHandler = async (req, res, next) => {
  const customer = req.body.customer;

  try {
    const newCust = new CustomerModel({...customer, customerID: uuidV4()});

    const x = await newCust.save();
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }

  next();
};

export {addCustomer};
