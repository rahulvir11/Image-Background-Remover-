import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadSingleImage } from '../middleware/multer.js';
import { removeBgImage } from '../controllers/image_controller.js';


const imageRouter = express.Router();

imageRouter.post('/remove-bg', authMiddleware, uploadSingleImage, removeBgImage);

export default imageRouter;
