import { Router } from 'express';
import controller from './image.controller.js';
import fileMiddleware from '../middlewares/fileMiddleware.js';

const imageRouter = Router();

imageRouter.get('/search/:id', controller.getImage);

imageRouter.post('/submit', fileMiddleware, controller.imageUpload);

export default imageRouter;
