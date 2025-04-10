import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import accountRoutes from './routes/accountRoutes';
/*import orderRoutes from './routes/orderRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import menuRoutes from './routes/menuRoutes';
import itemRoutes from './routes/itemRoutes';
import cartRoutes from './routes/cartRoutes';*/

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test
app.use(cors()); // Autorise toutes les origines

// Routes
app.use('/api/accounts', accountRoutes);
/*app.use('/api/accounts', cartRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurants', menuRoutes);
app.use('/api/restaurants', itemRoutes);
app.use('/api', orderRoutes);*/


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
