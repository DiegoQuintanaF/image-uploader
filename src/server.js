import express from 'express';
import routerAPI from './network/routes.js';
import { PORT } from './config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routerAPI(app);

app.listen(PORT);
