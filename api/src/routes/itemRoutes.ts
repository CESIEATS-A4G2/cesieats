import express from 'express';
import { createItem } from '../controllers/itemController';

const router = express.Router();

router.post('/restaurants/:restaurant_id/menus/:menu_id/items', createItem);
/*router.get('/restaurants/:restaurant_id/menus/:menu_id/items', getAllItemsFromMenu);
router.get('/restaurants/:restaurant_id/menus/:menu_id/items/:item_id', getItemByIdFromMenu);
router.delete('/restaurants/:restaurant_id/menus/:menu_id/items/:item_id', deleteItem);*/

export default router;