import {RequestHandler} from 'express';
import {CustomerModel} from '../models/customer';
import {ShippingModel} from '../models/shipping';

const filterCity: RequestHandler = async (req, res, next) => {
  let data: string[] = [];
  try {
    const ids = await ShippingModel.find(
      {city: req.params.city},
      {customerID: 1},
    ).lean();

    data = await CustomerModel.find({
      customerID: {$in: ids.map((id) => id.customerID)},
    }).lean();
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }

  res.locals.data = data;

  next();
};

export {filterCity};
