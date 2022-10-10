import express from 'express';
import { reactPost, getReacts } from '../controllers/react';
import { authUser } from '../middlewares/auth';

const router = express.Router();
router.put('/post', authUser, reactPost);
router.get('/:id', authUser, getReacts);
export default router;
