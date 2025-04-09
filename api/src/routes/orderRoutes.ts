import express from 'express';
import { createOrder, deleteOrder, getOrderById, getOrdersByAccountId, getOrdersByAccountIdByStatus, getOrdersByStatus, updateOrderStatus } from '../controllers/orderController';

const router = express.Router();

router.post('/accounts/:account_id/orders', createOrder);
router.get('/accounts/:account_id/orders', getOrdersByAccountId);
router.get('/accounts/:account_id/orders/status/:status', getOrdersByAccountIdByStatus);
router.get('/orders/status/:status', getOrdersByStatus);
router.put('/orders/:order_id/:status', updateOrderStatus);
router.get('/orders/:order_id', getOrderById);
router.delete('/orders/:order_id', deleteOrder);

export default router;