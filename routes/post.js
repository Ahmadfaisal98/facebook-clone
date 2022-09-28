import express from 'express';
import { createPost, getAllPosts } from '../controllers/post';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authUser, createPost);
router.get('/get-all', authUser, getAllPosts);

export default router;
