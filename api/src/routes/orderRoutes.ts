import express from 'express';
import { createOrder, createOrdersTest, getOrderById, getOrdersByAccountId, getOrdersByAccountIdByStatus, getOrdersByStatus, updateOrderStatus } from '../controllers/orderController';

const router = express.Router();

router.post('/accounts/:account_id/orders', createOrder);
router.get('/accounts/:account_id/orders', getOrdersByAccountId);
router.get('/accounts/:account_id/orders/status', getOrdersByAccountIdByStatus);
router.get('/orders/status', getOrdersByStatus);
router.put('/orders/:order_id', updateOrderStatus);
router.get('/orders/:order_id', getOrderById);

router.get('/orders/test/generate', createOrdersTest); //supprimer

export default router;