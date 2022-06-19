import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';
import {spec} from './swagger';
import router from './api';

const port = process.env.PORT || 8989;
const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use('/docs', serve, setup(spec));
app.use('/api', router);

app.listen(port, () => {
  console.log('server start');
});
