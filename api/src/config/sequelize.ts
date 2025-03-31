import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    //logging: true, // Desactive les logs SQL
});

export const connectSequelize = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données Sequelize réussie');

        await sequelize.sync({ alter: true }); // Synchronisation des modeles
        console.log('Base de donnees Sequelize synchronisee');
    } catch (error) {
        console.error('Erreur de connexion à Sequelize:', error);
    }
};