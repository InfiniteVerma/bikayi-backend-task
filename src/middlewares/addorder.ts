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
      throw new Error('No such customer exists');
    }

    console.log(cust);
    console.log(order);

    // // check pricing mrp
    // if(order.pricing>order.mrp){
    //     thro
    // }

    // save order
    const newOrder = new OrderModel({...order, purchaseOrderID: uuidV4()});

    const x = await newOrder.save();
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }

  next();
};

export {addOrder};
