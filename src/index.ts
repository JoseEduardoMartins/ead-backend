import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './config/routes';

const app: Express = express();

app.set('port', process.env.APP_PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))
app.use(router);

export default app;
