import express from 'express';
import { createMenu, deleteMenu, getAllMenusFromRestaurant, getMenuByIdByRestaurant, addItemToMenu, removeItemFromMenu } from '../controllers/menuController';
import { deleteRestaurant } from '../controllers/restaurantsController';

const router = express.Router();

router.post('/:restaurant_id/menus', createMenu);
router.post('/:restaurant_id/menus/:menu_id', addItemToMenu);
router.delete('/:restaurant_id/menus/:menu_id/items/:item_id', removeItemFromMenu);
router.get('/:restaurant_id/menus', getAllMenusFromRestaurant);
router.get('/:restaurant_id/menus/:menu_id', getMenuByIdByRestaurant);
router.delete('/:restaurant_id/menus/:menu_id', deleteMenu);

export default router;