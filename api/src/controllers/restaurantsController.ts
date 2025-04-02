import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurant';

// Creer un restaurant
export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, address, open_hour } = req.body;
        // Créer un compte utilisateur avec Sequelize
        const newRestaurant = await Restaurant.create({
            name,
            description,
            address,
            open_hour
        });
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du restaurant', error });
    }
};

// Obtenir tous les restaurants
export const getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurants = await Restaurant.findAll();        
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des restaurants', error });
    }
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtenir un restaurant par son ID avec Sequelize
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) {
            res.status(404).json({ message: 'Restaurant non trouvé' });
            return;
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du restaurant', error });
    }
};

// Supprimer un restaurant par ID
export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedRestaurant = await Restaurant.destroy({
            where: { restaurant_id: req.params.id }
        });
        if (!deletedRestaurant) {
            res.status(404).json({ message: 'Restaurant non trouvé' });
            return;
        }
        res.status(200).json({ message: 'Restaurant supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du restaurant', error });
    }
};
