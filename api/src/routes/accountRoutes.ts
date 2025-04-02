import express from 'express';
import { createAccount, getAllAccounts, deleteAccount, getAccountById } from '../controllers/accountController';

const router = express.Router();

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.delete('/:id', deleteAccount);

export default router;