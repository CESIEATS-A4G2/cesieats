import dotenv from 'dotenv';
import express from 'express';
import orderRoutes from './routes/orderRoutes';
import accountRoutes from './routes/accountRoutes';
import {connectMongoose} from './config/mongoose';
import {connectSequelize} from './config/sequelize';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB/MySQL
connectMongoose();
connectSequelize();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/accounts', accountRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
