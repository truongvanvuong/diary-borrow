import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

import diaryRouter from './Router/Diary.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: true,
  credentials: true,
};

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log('Connected to mongodb');
  } catch (error) {
    console.log('Connected to mongodb failed: ' + error);
  }
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(corsOptions));
app.get('/', (req, res) => {
  res.send('Api is working diary borrow api');
});

app.use('/api/diary', diaryRouter);

app.listen(port, () => {
  connect();
  console.log('listening on port ' + port);
});
