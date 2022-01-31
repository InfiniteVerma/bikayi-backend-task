import {Router} from 'express';
import {addCustomer} from './middlewares/addcust';
import {addOrder} from './middlewares/addorder';
const router = Router();

/**
 *
 *
 */
router.post(
  '/customer',
  (req, res, next) => {
    if (!req.body.customer) {
      return res.status(400).json({msg: 'Missing customer body'});
    }
    next();
  },
  addCustomer,
  (req, res) => {
    res.status(201).json({msg: 'New customer added'});
  },
);

/**
 *
 */
router.post(
  '/order',
  (req, res, next) => {
    if (!req.body.order) {
      return res.status(400).json({msg: 'Missing order body'});
    }
    next();
  },
  addOrder,
  (req, res) => {
    res.status(201).json({msg: 'New Order added'});
  },
);

export {router};
