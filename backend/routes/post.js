import express from 'express';
import { createPost, getAllPosts, comment } from '../controllers/post';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authUser, createPost);
router.get('/get-all', authUser, getAllPosts);
router.put('/comment', authUser, comment);

export default router;
