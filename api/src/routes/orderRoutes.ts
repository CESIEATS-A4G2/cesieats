import express from 'express';
import { createOrder, getOrderById, getOrdersByAccountId, getOrdersByAccountIdByStatus, getOrdersByStatus, updateOrderStatus } from '../controllers/orderController';

const router = express.Router();

router.post('/:account_id/orders', createOrder);
router.get('/:account_id/orders', getOrdersByAccountId);
router.get('/:account_id/orders/status', getOrdersByAccountIdByStatus);
router.get('/orders/status', getOrdersByStatus);
router.put('/:account_id/orders/:order_id', updateOrderStatus);
router.get('/:account_id/orders/:order_id', getOrderById);

export default router;