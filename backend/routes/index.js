import express from 'express';
import user from './user.js';
import post from './post.js';
import upload from './upload.js';
import react from './react.js';

const router = express.Router();

router.use('/user', user);
router.use('/post', post);
router.use('/upload', upload);
router.use('/react', react);

export default router;
