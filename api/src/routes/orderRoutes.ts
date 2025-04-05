import express from 'express';
import { createOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/:account_id/orders', createOrder);

export default router;