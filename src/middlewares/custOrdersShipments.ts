import {RequestHandler} from 'express';
import {OrderModel} from '../models/order';

// 1. Orders are left joined with shippings
// 2. Orders without shipping are REMOVED
// 3. They are grouped by customers

// (following is same as customer with orders)
// 4. Resulting is left joined by customers db to enter customer details
// 5. The customer array is unwinded into single object
// 6. Fields from customer object is put in root
// 7. customer object is removed from projection
const QUERY = [
  {
    $lookup: {
      from: 'shippings',
      localField: 'purchaseOrderID',
      foreignField: 'purchaseOrderID',
      as: 'shipmentDetail',
    },
  },
  {
    $match: {
      'shipmentDetail.0': {
        $exists: true,
      },
    },
  },
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
    $project: {
      customer: 0,
    },
  },
];

const custWithOrdersAndShipment: RequestHandler = async (req, res, next) => {
  try {
    const data = await OrderModel.aggregate(QUERY);

    res.locals.data = data;
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }

  next();
};

export {custWithOrdersAndShipment};
