import express from 'express';
import { createUser, createRestaurantOwner, createDeliveryDriver, getAllAccounts, deleteAccount, getAccountById } from '../controllers/accountController';

const router = express.Router();

router.post('/', createUser);
// router.post('/restaurant-owner', createRestaurantOwner);
// router.post('/delivery-driver', createDeliveryDriver);
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.delete('/:id', deleteAccount);

export default router;