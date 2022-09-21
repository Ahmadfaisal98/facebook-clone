import express from 'express';
import { activateAccount, login, register, auth } from '../controllers/user';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', login);
router.post('/auth', authUser, auth);

export default router;
