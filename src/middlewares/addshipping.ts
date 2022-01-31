import {RequestHandler} from 'express';
import {v4 as uuidV4} from 'uuid';
import {Order} from '../interfaces/order';
import {CustomerModel} from '../models/customer';
import {OrderModel} from '../models/order';
import {Shipping} from '../interfaces/shipping';
import {ShippingModel} from '../models/shipping';

const addShipping: RequestHandler = async (req, res, next) => {
  const shipping: Shipping = req.body.shipping;

  try {
    // find a order with purchaseOrderID and customerID
    const order = await OrderModel.findOne({
      purchaseOrderID: shipping.purchaseOrderID,
      customerID: shipping.customerID,
    });

    if (!order) {
      return new Error('No such customerID/purchaseOrderID exists');
    }

    const newShipping = new ShippingModel({...shipping});

    await newShipping.save();
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }

  next();
};

export {addShipping};