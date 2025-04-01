import express from 'express';
import { createMenu, deleteMenu, getAllMenusFromRestaurant, getMenuByIdByRestaurant } from '../controllers/menuController';

const router = express.Router();

router.post('/restaurants/:restaurant_id/menus', createMenu);
router.get('/restaurants/:restaurant_id/menus', getAllMenusFromRestaurant);
router.get('/restaurants/:restaurant_id/menus/:menu_id', getMenuByIdByRestaurant);
router.delete('/restaurants/:restaurant_id/menus/:menu_id', deleteMenu);

export default router;