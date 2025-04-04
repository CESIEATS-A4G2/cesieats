import express from 'express';
import { createItem, getAllItemsFromMenuFromRestaurant, getAllItemsFromRestaurant, getItemByIdFromRestaurant, deleteItemFromRestaurant, deleteItemFromMenuFromRestaurant } from '../controllers/itemController';

const router = express.Router();

router.post('/:restaurant_id/items', createItem);
router.get('/:restaurant_id/menus/:menu_id/items', getAllItemsFromMenuFromRestaurant);
router.get('/:restaurant_id/items', getAllItemsFromRestaurant);
router.get('/:restaurant_id/items/:item_id', getItemByIdFromRestaurant);
router.delete('/:restaurant_id/items/:item_id', deleteItemFromRestaurant);
router.delete('/:restaurant_id/menus/:menu_id/items/:item_id', deleteItemFromMenuFromRestaurant);

export default router;