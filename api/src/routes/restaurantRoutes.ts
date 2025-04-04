import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, addRestaurantToUser as addUserToRestaurant, removeRestaurantFromUser as removeUserFromRestaurant } from '../controllers/restaurantsController';

const router = express.Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.delete('/:id', deleteRestaurant);
router.post('/:restaurant_id/users', addUserToRestaurant)
router.delete('/:restaurant_id/users/:account_id', removeUserFromRestaurant);

export default router;