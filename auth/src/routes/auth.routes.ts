import express from 'express';
import { register, login, authenticate } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/authenticate', authenticate);

export default router;