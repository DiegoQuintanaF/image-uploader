import express from 'express';

const imageRouter = express.Router();

imageRouter.get('/', (req, res) => {
  res.send('Hi images!');
});

export default imageRouter;
