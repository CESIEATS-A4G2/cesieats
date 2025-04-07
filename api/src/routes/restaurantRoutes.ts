import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, addRestaurantToRestaurateur as addUserToRestaurant, removeRestaurantFromRestaurateur as removeUserFromRestaurant } from '../controllers/restaurantsController';

const router = express.Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:restaurant_id', getRestaurantById);
router.delete('/:restaurant_id', deleteRestaurant);
router.post('/:restaurant_id/users', addUserToRestaurant)
router.delete('/:restaurant_id/users/:account_id', removeUserFromRestaurant);

export default router;