import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './api';

const port = process.env.PORT || 8989;
const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use('/api', router);

app.get('/hello', async (req, res) => res.json({message: 'hello'}) )

app.listen(port, () => {
  console.log('server start');
});
