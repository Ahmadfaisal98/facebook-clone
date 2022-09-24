import express from 'express';
import user from './user.js';
import post from './post.js';
import upload from './upload.js';

const router = express.Router();

router.use('/user', user);
router.use('/post', post);
router.use('/upload', upload);

export default router;
