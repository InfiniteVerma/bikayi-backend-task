import {RequestHandler} from 'express';
import {ShippingModel} from '../models/shipping';

const QUERY = (city: string) => [
  {
    $match: {city: city},
  },
  {
    $lookup: {
      from: 'customers',
      localField: 'customerID',
      foreignField: 'customerID',
      as: 'data',
    },
  },
  {
    $unwind: '$data',
  },
  {
    $replaceRoot: {newRoot: '$data'},
  },
];

const filterCity: RequestHandler = async (req, res, next) => {
  let data: string[] = [];
  try {
    data = await ShippingModel.aggregate(QUERY(req.params.city));
  } catch (e) {
    return res.status(500).json({msg: e.message});
  }

  res.locals.data = data;

  next();
};

export {filterCity};
