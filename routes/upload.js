import express from 'express';
import { uploadImages } from '../controllers/upload';
import imageUpload from '../middlewares/imageUpload';

const router = express.Router();

router.post('/images', imageUpload, uploadImages);

export default router;
