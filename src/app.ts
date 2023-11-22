
import express from 'express';
import cors from 'cors';
import compression from 'compression'
import morgan from 'morgan';
import helmet from 'helmet';



import {router as userRoutes}  from './routes/index.route';
import { deserializeSession } from './middleware/deserialize.session';

const app = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());


app.use(deserializeSession);

app.use('/api',userRoutes);


export default app;