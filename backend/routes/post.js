import express from 'express';
import { createPost } from '../controllers/post';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authUser, createPost);

export default router;
