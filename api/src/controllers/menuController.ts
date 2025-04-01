import { Request, Response } from 'express';
import { Menu } from '../models/menu';
import { Restaurant } from '../models/restaurant';

// Creer un menu
export const createMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id } = req.params;
        const { name } = req.body;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        // Créer un compte utilisateur avec Sequelize
        const newMenu = await Menu.create({name, restaurant_id});

        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du menu', error });
    }
};

// Obtenir tous les menu d'un restaurant
export const getAllMenusFromRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const {restaurant_id} = req.params;
        
        const restaurant = await Restaurant.findByPk(restaurant_id);
        if(!restaurant){
            res.status(404).json({ message: "Restaurant non trouvé" });
        }
        const menus = await Menu.findAll({
            where: { restaurant_id: restaurant_id }
        });        
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des menus', error });
    }
};

export const getMenuByIdByRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id } = req.params;

        // Vérifier si le restaurant existe
        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {6
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        // Rechercher le menu qui appartient à ce restaurant
        const menu = await Menu.findOne({
            where: { restaurant_id, menu_id } // Vérifie que le menu appartient bien au restaurant
        });

        if (!menu) {
            res.status(404).json({ message: "Menu non trouvé pour ce restaurant" });
            return;
        }

        res.status(200).json(menu);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du menu", error });
    }
};

// Supprimer un menu par ID
export const deleteMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id } = req.params;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return
        }

        const menu = await Menu.findOne({
            where: { restaurant_id, menu_id }
        });

        if (!menu) {
            res.status(404).json({ message: "Menu non trouvé pour ce restaurant" });
            return;
        }

        // Suppression du menu
        await menu.destroy();

        res.status(200).json({ message: "Menu supprimé avec succès" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du menu", error });
    }
};
