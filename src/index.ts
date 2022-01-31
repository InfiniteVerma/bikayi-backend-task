import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {connect} from 'mongoose';
import {router} from './routes';

dotenv.config();

// check env variables first
if (!process.env.PORT) {
  console.log('Missing port in .env');
  process.exit(1);
}

// connect to mongodb
connect('mongodb://localhost:27017/bikayi', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connect to DB');
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('common'));
app.use(cors());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
