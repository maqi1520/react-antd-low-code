import express from 'express';
import next from 'next';
import morgan from 'morgan';

import project from './controllers/project';
import component from './controllers/component';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/project', project);
  app.use('/api/component', component);

  app.use(errorHandler);

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
