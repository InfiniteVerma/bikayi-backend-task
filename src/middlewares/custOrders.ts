import {RequestHandler} from 'express';
import {OrderModel} from '../models/order';

// 1. Orders are grouped by customerID
// 2. Left joined by customer data (lookup)
// 3. The customer array is unwinded into single object
// 4. Fields from customer object is put in root
// 5. customer object is removed from projection
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
