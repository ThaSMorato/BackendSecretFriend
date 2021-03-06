import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';
require('dotenv/config');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port);