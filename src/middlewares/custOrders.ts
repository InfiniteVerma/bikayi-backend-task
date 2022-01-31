import {RequestHandler} from 'express';
import {OrderModel} from '../models/order';

const QUERY = [
  {
    $group: {
      _id: {
        customerID: '$customerID',
      },
      purchaseOrder: {
        $push: '$$ROOT',
      },
    },
  },
  {
    $lookup: {
      from: 'customers',
      localField: 'purchaseOrder.customerID',
      foreignField: 'customerID',
      as: 'customer',
    },
  },
  {
    $unwind: '$customer',
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ['$$ROOT', '$customer'],
      },
    },
  },
  {
    $project: {customer: 0},
  },
];

const custWithOrders: RequestHandler = async (req, res, next) => {
  try {
    const data = await OrderModel.aggregate(QUERY);

    res.locals.data = data;
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }
  next();
};

export {custWithOrders};
