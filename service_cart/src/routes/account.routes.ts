import express from 'express';
import { createAccount, getAllAccounts, getAllAccountsByRole, getAccountById, deleteAccount, updateAccount, suspendAccount } from '../controllers/controller';

const router = express.Router();

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/roles/:role', getAllAccountsByRole);
router.get('/:account_id', getAccountById);
router.delete('/:account_id', deleteAccount);
router.put('/:account_id', updateAccount);
router.put('/:account_id/actions/suspend', suspendAccount);

export default router;