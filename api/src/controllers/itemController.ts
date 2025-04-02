import { Request, Response } from "express";
import { Item } from "../models/item";
import { Menu, Menu_Item } from "../models/menu";
import {Restaurant} from "../models/restaurant";
import { Op } from "sequelize";

export const createItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id } = req.params;
        const { name, description, price, image } = req.body;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
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

export const getAllItemsFromRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id } = req.params;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        const items = await Item.findAll({ where: { restaurant_id: restaurant_id } });

        res.status(200).json(items);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des items d'un restaurant", error });
    }
};

export const getAllItemsFromMenuFromRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, menu_id } = req.params;

        // Vérifier si le restaurant existe
        const restaurant = await Restaurant.findByPk(restaurant_id);
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

        // Récupérer les item_id associés au menu
        const menuItems = await Menu_Item.findAll({ 
            where: { menu_id: menu_id }, 
            attributes: ['item_id'] 
        });
        // Extraire les ID des items
        const itemIds = menuItems.map(item => item.item_id);

        if (itemIds.length === 0) {
            res.status(200).json([]); // Retourner une liste vide si aucun item
            return;
        }

        // Récupérer tous les items correspondants
        const items = await Item.findAll({ 
            where: { item_id: { [Op.in]: itemIds } } 
        });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des items d'un menu", error });
    }
};

export const getItemByIdFromRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, item_id } = req.params;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        // Rechercher l’item dans ce menu
        const item = await Item.findOne({ where: { item_id: item_id, restaurant_id: restaurant_id } });

        if (!item) {
            res.status(404).json({ message: "Item non trouvé dans ce restaurant" });
            return;
        }

        res.status(200).json(item);
        return;
    } catch (error) {
        console.error("Erreur Sequelize:", error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'item dans un restaurant", error });
    }
};

export const deleteItemFromRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, item_id } = req.params;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant non trouvé" });
            return;
        }

        // Vérifier si l’item existe
        const item = await Item.findByPk(item_id);
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
};

export const deleteItemFromMenuFromRestaurant = async (req: Request, res: Response): Promise<void> => {
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

        // Vérifier si l’item existe
        const item = await Item.findByPk(item_id);
        if (!item) {
            res.status(404).json({ message: "Item non trouvé dans le restaurant" });
            return;
        }

        // Verifier si l'item existe dans la table intermediaire (dans le menu)
        const menuItem = await Menu_Item.findOne({ where: { menu_id: menu_id, item_id: item_id } });
        if(!menuItem){
            res.status(404).json({ message: "Item non trouvé dans le menu" });
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
};
