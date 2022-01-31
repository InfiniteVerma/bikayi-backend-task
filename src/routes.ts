import {Router} from 'express';
import {addCustomer} from './middlewares/addcust';
import {addOrder} from './middlewares/addorder';
import {addShipping} from './middlewares/addshipping';
import {custWithOrders} from './middlewares/custOrders';
import {custWithOrdersAndShipment} from './middlewares/custOrdersShipments';
import {filterCity} from './middlewares/filtercity';
const router = Router();

/**
 * Creates a new customer
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
    res.status(201).json(res.locals.data);
  },
);

/**
 * Creates a new order
 * 1. customerID is checked first
 * 2. new order document is created
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
 * Creates new shipping entry
 * 1. customerID and purchaseOrderID is checked
 * 2. new shipping document is created
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
 * Searches for shipping orders with the city send in along with the request
 * Returns empty array if no shipping exists
 */
router.get('/shipping/:city', filterCity, (req, res) => {
  res.status(200).json(res.locals.data);
});

/**
 * Returns customers with all of their purchase orders
 */
router.get('/allorders', custWithOrders, (req, res) => {
  res.status(200).json(res.locals.data);
});

/**
 * Returns customer with their order and shipping details
 */
router.get('/alldetails', custWithOrdersAndShipment, (req, res) => {
  res.status(200).json(res.locals.data);
});

export {router};
