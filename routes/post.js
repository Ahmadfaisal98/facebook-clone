import express from 'express';
import {
  createPost,
  getAllPosts,
  comment,
  deletePost,
} from '../controllers/post';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/create', authUser, createPost);
router.get('/get-all', authUser, getAllPosts);
router.put('/comment', authUser, comment);
router.delete('/:id', authUser, deletePost);

export default router;
