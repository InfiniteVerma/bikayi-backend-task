import {Router} from 'express';
import {addCustomer} from './middlewares/addcust';
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

export {router};
