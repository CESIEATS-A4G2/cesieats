import express from 'express';
import {createCart, deleteCart, addItemToCart, addMenuToCart, removeItemFromCart, removeMenuFromCart, getAllCartContentAccount } from '../controllers/cartController';

const router = express.Router();

router.post('/:account_id/cart', createCart);
router.get('/:account_id/cart', getAllCartContentAccount);
router.delete('/:account_id/cart', deleteCart);
router.post('/:account_id/cart/items', addItemToCart);
router.post('/:account_id/cart/menus', addMenuToCart);
router.delete('/:account_id/cart/items', removeItemFromCart);
router.delete('/:account_id/cart/menus', removeMenuFromCart);

export default router;