import express from 'express';
import { uploadImages } from '../controllers/upload';
import imageUpload from '../middlewares/imageUpload';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/images', authUser, imageUpload, uploadImages);

export default router;
