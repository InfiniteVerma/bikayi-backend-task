import {Router} from 'express';
import {addCustomer} from './middlewares/addcust';
import {addOrder} from './middlewares/addorder';
import {addShipping} from './middlewares/addshipping';
import {custWithOrders} from './middlewares/custWithOrders';
import {filterCity} from './middlewares/filtercity';
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
    console.log(res.locals.data);
    res.status(201).json(res.locals.data);
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
    res.status(201).json(res.locals.data);
  },
);

/**
 *
 */
router.post(
  '/shipping',
  (req, res, next) => {
    if (!req.body.shipping) {
      return res.status(400).json({msg: 'Missing shipping body'});
    }
    next();
  },
  addShipping,
  (req, res) => {
    res.status(201).json({msg: 'New Shipping added'});
  },
);

/**
 *
 */
router.get('/shipping/:city', filterCity, (req, res) => {
  const data = res.locals.data;
  res.status(200).json({data: data});
});

/**
 *
 */
router.get('/allorders', custWithOrders, (req, res) => {
  res.status(200).json(res.locals.data);
});

export {router};
