import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accountRoutes from './routes/account.routes';
import "./cron/suspensionJob";

import {connectMongoose} from './config/mongoose';
import {connectSequelize} from './config/sequelize';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connexion à MongoDB/MySQL
connectMongoose();
connectSequelize();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/accounts', accountRoutes);

app.listen(port, () => {
  console.log(`User service running on port ${port}`);
});
