import { Request, Response } from "express";
import { Item } from "../models/item";
import { Menu } from "../models/menu";
import {Restaurant} from "../models/restaurant";

export const createItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id } = req.params;
        const { name, description, price, image } = req.body;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        const menu = await Menu.findByPk(menu_id);
        if (!menu) {
            res.status(404).json({ message: "Menu non trouvé" });
            return;
        }

        // Créer l'item
        const newItem = await Item.create({ restaurant_id, name, description, price, image  });

        res.status(201).json(newItem);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'item", error });
    }
};

/*export const getAllItemsFromMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id } = req.params;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        const menu = await Menu.findByPk(menu_id);
        if (!menu) {
            res.status(404).json({ message: "Menu non trouvé" });
            return;
        }

        const items = await Item.findAll({ where: {restaurant_id: restaurant_id, menu_id: menu_id } });

        res.status(200).json(items);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des items", error });
    }
};*/

/*export const getItemByIdFromMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id, item_id } = req.params;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }
        
        const menu = await Menu.findByPk(menu_id);
        if (!menu) {
            res.status(404).json({ message: "Menu non trouvé" });
            return;
        }

        // Rechercher l’item dans ce menu
        const item = await Item.findOne({ where: { restaurant_id: restaurant_id, menu_id: menu_id, item_id: item_id } });

        if (!item) {
            res.status(404).json({ message: "Item non trouvé dans ce menu" });
            return;
        }

        res.status(200).json(item);
        return;
    } catch (error) {
        console.error("Erreur Sequelize:", error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'item", error });
    }
};*/

/*export const deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id, item_id } = req.params;

        const restaurant = await Menu.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        // Vérifier si le menu existe
        const menu = await Menu.findByPk(menu_id);
        if (!menu) {
            res.status(404).json({ message: "Menu non trouvé" });
            return;
        }

        // Vérifier si l’item existe
        const item = await Item.findOne({ where: { menu_id, item_id: item_id } });

        if (!item) {
            res.status(404).json({ message: "Item non trouvé" });
            return;
        }

        // Suppression de l’item
        await item.destroy();

        res.status(200).json({ message: "Item supprimé avec succès" });
        return;
    } catch (error) {
        console.error("Erreur Sequelize:", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'item", error });
    }
};*/
