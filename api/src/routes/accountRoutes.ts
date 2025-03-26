import express from 'express';
import { createUser, createRestaurantOwner, createDeliveryDriver, getAllAccounts, deleteAccount } from '../controllers/accountController';

const router = express.Router();

router.post('/user', createUser);
router.post('/restaurant-owner', createRestaurantOwner);
router.post('/delivery-driver', createDeliveryDriver);
router.get('/', getAllAccounts);
router.delete('/:id', deleteAccount);

export default router;