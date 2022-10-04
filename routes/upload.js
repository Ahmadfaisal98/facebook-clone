import express from 'express';
import { uploadImages, listImages } from '../controllers/upload';
import imageUpload from '../middlewares/imageUpload';
import { authUser } from '../middlewares/auth';

const router = express.Router();

router.post('/images', authUser, imageUpload, uploadImages);
router.get('/list-images', listImages);

export default router;
