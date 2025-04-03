import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById } from '../controllers/restaurantsController';

const router = express.Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.delete('/:id', deleteRestaurant);

export default router;