import {RequestHandler} from 'express';
import {v4 as uuidV4} from 'uuid';
import {Order} from '../interfaces/order';
import {CustomerModel} from '../models/customer';
import {OrderModel} from '../models/order';

const addOrder: RequestHandler = async (req, res, next) => {
  const order: Order = req.body.order;

  try {
    // check if customer exists
    const cust = await CustomerModel.findOne({customerID: order.customerID});

    if (!cust) {
      throw {code: 400, message: 'No such customer exists'};
    }

    // save order
    const newOrder = new OrderModel({...order, purchaseOrderID: uuidV4()});

    res.locals.data = await newOrder.save();
  } catch (e) {
    return res.status(e.code ?? 500).json({msg: e.message});
  }

  next();
};

export {addOrder};
