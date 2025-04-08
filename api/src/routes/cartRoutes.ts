import express from 'express';
import {createCart, deleteCart, addItemToCart, addMenuToCart, removeItemFromCart, removeMenuFromCart, getAllCartContentAccount, updateQuantityMenuFromCart, updateQuantityItemFromCart } from '../controllers/cartController';

const router = express.Router();

router.post('/:account_id/cart', createCart);
router.get('/:account_id/cart', getAllCartContentAccount);
router.delete('/:account_id/cart', deleteCart);
router.post('/:account_id/cart/items', addItemToCart);
router.post('/:account_id/cart/menus', addMenuToCart);
router.put('/:account_id/cart/items/:item_id/:quantity', updateQuantityItemFromCart);
router.put('/:account_id/cart/menus/:menu_id/:quantity', updateQuantityMenuFromCart);
router.delete('/:account_id/cart/items', removeItemFromCart);
router.delete('/:account_id/cart/menus', removeMenuFromCart);

export default router;