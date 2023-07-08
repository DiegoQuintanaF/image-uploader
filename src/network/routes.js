import express from 'express';
import imageRouter from '../image/image.network.js';

const routerAPI = (app) => {
  const router = express.Router();

  app.use('/', express.static('public'));

  app.use('/api/v1', router);
  router.use('/image', imageRouter);
};

export default routerAPI;
