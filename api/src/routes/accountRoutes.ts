import express from 'express';
import { createAccount, getAllAccounts, getAllAccountsByRole, deleteAccount, getAccountById } from '../controllers/accountController';

const router = express.Router();

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/roles/:role', getAllAccountsByRole);
router.get('/:account_id', getAccountById);
router.delete('/:account_id', deleteAccount);

export default router;