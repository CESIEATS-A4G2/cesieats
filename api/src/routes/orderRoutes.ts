import express from 'express';
import { createOrder, getOrdersByAccountId, getOrdersByAccountIdByStatus, getOrdersByStatus } from '../controllers/orderController';

const router = express.Router();

router.post('/:account_id/orders', createOrder);
router.get('/:account_id/orders', getOrdersByAccountId);
router.get('/:account_id/orders/status', getOrdersByAccountIdByStatus);
router.get('/orders/status', getOrdersByStatus);


export default router;